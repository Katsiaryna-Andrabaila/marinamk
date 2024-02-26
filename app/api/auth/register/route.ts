import { CookieArgs, NextApiResponseWithCookie } from 'shared/apiTypes';
import checkFields from 'shared/apiUtils/checkFields';
import { cookieFn } from 'shared/apiUtils/cookie';
import prisma from 'shared/apiUtils/prisma';
import { User } from '@prisma/client';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest, res: NextApiResponseWithCookie) {
    const body = await req.json();
    const data: Pick<User, 'name' | 'email' | 'password'> = body;

    if (!checkFields(data, ['email', 'password'])) {
        return new Response('Some required fields are missing', {
            status: 400,
        });
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email: data.email },
        });

        if (existingUser) {
            return new Response('Email already in use', {
                status: 409,
            });
        }

        // хэшируем пароль
        const passwordHash = await argon2.hash(data.password);
        // и заменяем им оригинальный
        data.password = passwordHash;

        const newUser = await prisma.user.create({
            data,
            select: {
                id: true,
                name: true,
                email: true,
            },
        });

        // генерируем токен идентификации на основе ID пользователя
        const idToken = await jwt.sign(
            { userId: newUser.id },
            process.env.ID_TOKEN_SECRET,
            {
                // срок жизни токена, т.е. время, в течение которого токен будет считаться валидным составляет 7 дней
                // продумать автоматическое продление токена
                expiresIn: '7d',
            }
        );

        const accessToken = await jwt.sign(
            { userId: newUser.id },
            process.env.ACCESS_TOKEN_SECRET,
            {
                // важно!
                // такой срок жизни токена доступа приемлем только при разработке приложения
                // в production поставить примерно 1 час
                expiresIn: '1d',
            }
        );

        // записываем токен идентификации в куки
        res.cookie({
            name: process.env.COOKIE_NAME,
            value: idToken,
            options: {
                httpOnly: true,
                // значение данной настройки должно совпадать со значением настройки `expiresIn` токена
                maxAge: 1000 * 60 * 60 * 24 * 7,
                // куки применяется для всего приложения
                path: '/',
                // клиент и сервер живут по одному адресу
                sameSite: true,
                secure: true,
            },
        });

        res.cookie = (args: CookieArgs) => cookieFn(res, args);

        return new Response(
            JSON.stringify({
                user: newUser,
                accessToken,
            }),
            {
                status: 200,
            }
        );
    } catch (e) {
        console.log(e);
        return new Response('User register error', {
            status: 500,
        });
    }
}

export async function GET() {
    try {
        const users = JSON.stringify(await prisma.user.findMany());
        return new Response(users, {
            status: 200,
        });
    } catch (e) {
        console.error(e);
        return new Response('Internal server error', {
            status: 500,
        });
    }
}

export async function DELETE(req: NextRequest) {
    const body = await req.json();
    const data: Pick<User, 'id'> = body;

    if (!checkFields(data, ['id'])) {
        return new Response('User ID is missing', {
            status: 400,
        });
    }

    try {
        await prisma.user.delete({
            where: {
                id: data.id,
            },
        });
        return new Response(null, {
            status: 204,
        });
    } catch (e) {
        console.error(e);
        return new Response('User remove error', {
            status: 500,
        });
    }
}

/* const registerHandler: NextApiHandlerWithCookie = async (req, res) => {
    const data: Pick<User, 'name' | 'email' | 'password'> = JSON.parse(
        req.body
    );

    if (!checkFields(data, ['email', 'password'])) {
        return res
            .status(400)
            .json({ message: 'Some required fields are missing' });
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email: data.email },
        });

        if (existingUser) {
            return res.status(409).json({ message: 'Email already in use' });
        }

        // хэшируем пароль
        const passwordHash = await argon2.hash(data.password);
        // и заменяем им оригинальный
        data.password = passwordHash;

        const newUser = await prisma.user.create({
            data,
            // важно!
            // не "выбираем" пароль
            select: {
                id: true,
                name: true,
                email: true,
            },
        });

        // генерируем токен идентификации на основе ID пользователя
        const idToken = await jwt.sign(
            { userId: newUser.id },
            process.env.ID_TOKEN_SECRET,
            {
                // срок жизни токена, т.е. время, в течение которого токен будет считаться валидным составляет 7 дней
                // продумать автоматическое продление токена
                expiresIn: '7d',
            }
        );

        const accessToken = await jwt.sign(
            { userId: newUser.id },
            process.env.ACCESS_TOKEN_SECRET,
            {
                // важно!
                // такой срок жизни токена доступа приемлем только при разработке приложения
                // в production поставить примерно 1 час
                expiresIn: '1d',
            }
        );

        // записываем токен идентификации в куки
        res.cookie({
            name: process.env.COOKIE_NAME,
            value: idToken,
            // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#attributes
            // важно!
            // настройки `httpOnly: true` и `secure: true` являются обязательными
            options: {
                httpOnly: true,
                // значение данной настройки должно совпадать со значением настройки `expiresIn` токена
                maxAge: 1000 * 60 * 60 * 24 * 7,
                // куки применяется для всего приложения
                path: '/',
                // клиент и сервер живут по одному адресу
                sameSite: true,
                secure: true,
            },
        });

        res.status(200).json({
            user: newUser,
            accessToken,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'User register error' });
    }
};

export default cookies(registerHandler); */
