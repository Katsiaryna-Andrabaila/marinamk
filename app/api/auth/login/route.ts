import checkFields from 'shared/apiUtils/checkFields';
import prisma from 'shared/apiUtils/prisma';
import { User } from '@prisma/client';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import { serialize } from 'cookie';

export async function POST(req: NextRequest) {
    const body = await req.json();
    const data: Pick<User, 'email' | 'password'> = body;

    if (!checkFields(data, ['email', 'password'])) {
        return new Response('Some required fields are missing', {
            status: 400,
        });
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: data.email,
            },

            select: {
                id: true,
                email: true,
                password: true,
                name: true,
            },
        });

        if (!user) {
            return new Response('User not found', {
                status: 404,
            });
        }

        const isPasswordCorrect = await argon2.verify(
            user.password,
            data.password
        );

        if (!isPasswordCorrect) {
            return new Response('Wrong password', {
                status: 403,
            });
        }

        const idToken = await jwt.sign(
            { userId: user.id },
            process.env.ID_TOKEN_SECRET,
            {
                expiresIn: '7d',
            }
        );

        const accessToken = await jwt.sign(
            { userId: user.id },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: '1d',
            }
        );

        const options = {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            expires: new Date(Date.now() + 60 * 60 * 24 * 7),
            path: '/',
            sameSite: true,
            secure: true,
        };

        const stringValue =
            typeof idToken === 'object'
                ? 'j:' + JSON.stringify(idToken)
                : String(idToken);

        return new Response(
            JSON.stringify({
                user: {
                    id: user.id,
                    email: user.email,
                    username: user.name,
                },
                accessToken,
            }),
            {
                status: 200,
                headers: {
                    'Set-Cookie': serialize(
                        process.env.COOKIE_NAME,
                        String(stringValue),
                        options
                    ),
                },
            }
        );
    } catch (e) {
        console.log(e);
        return new Response('User login error', {
            status: 500,
        });
    }
}

/* const loginHandler: NextApiHandlerWithCookie = async (req, res) => {
    const data: Pick<User, 'email' | 'password'> = JSON.parse(req.body);

    if (!checkFields(data, ['email', 'password'])) {
        return res
            .status(400)
            .json({ message: 'Some required fields are missing' });
    }

    try {
        // получаем данные пользователя
        const user = await prisma.user.findUnique({
            where: {
                email: data.email,
            },
            // важно!
            // здесь нам нужен пароль
            select: {
                id: true,
                email: true,
                password: true,
                name: true,
            },
        });

        // если данные отсутствуют
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // проверяем пароль
        const isPasswordCorrect = await argon2.verify(
            user.password,
            data.password
        );

        // если введен неправильный пароль
        if (!isPasswordCorrect) {
            return res.status(403).json({ message: 'Wrong password' });
        }

        // генерируем токен идентификации
        const idToken = await jwt.sign(
            { userId: user.id },
            process.env.ID_TOKEN_SECRET,
            {
                expiresIn: '7d',
            }
        );

        // генерируем токен доступа
        const accessToken = await jwt.sign(
            { userId: user.id },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: '1d',
            }
        );

        // записываем токен идентификации в куки
        res.cookie({
            name: process.env.COOKIE_NAME,
            value: idToken,
            options: {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 7,
                path: '/',
                sameSite: true,
                secure: true,
            },
        });

        // возвращаем данные пользователя (без пароля!)
        // и токен доступа
        res.status(200).json({
            user: {
                id: user.id,
                email: user.email,
                username: user.name,
            },
            accessToken,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'User login error' });
    }
};

export default cookies(loginHandler); */
