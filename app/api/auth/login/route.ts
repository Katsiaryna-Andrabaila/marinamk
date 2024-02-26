import checkFields from 'shared/apiUtils/checkFields';
import prisma from 'shared/apiUtils/prisma';
import { User } from '@prisma/client';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import { serialize } from 'cookie';

export async function POST(req: NextRequest) {
    const body = await req.json();
    const data: Pick<User, 'name' | 'password'> = body;

    if (!checkFields(data, ['name', 'password'])) {
        return new Response('Some required fields are missing', {
            status: 400,
        });
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                name: data.name,
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
