import checkFields from 'shared/apiUtils/checkFields';
import prisma from 'shared/apiUtils/prisma';
import { User } from '@prisma/client';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import { serialize } from 'cookie';

export async function POST(req: NextRequest) {
    const body = await req.json();
    const data: Pick<User, 'name' | 'email' | 'password'> = body;

    if (!checkFields(data, ['name', 'email', 'password'])) {
        return new Response('Some required fields are missing', {
            status: 400,
        });
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { name: data.name },
        });

        if (existingUser) {
            return new Response('Name already in use', {
                status: 409,
            });
        }

        const passwordHash = await argon2.hash(data.password);
        data.password = passwordHash;

        const newUser = await prisma.user.create({
            data,
            select: {
                id: true,
                name: true,
                email: true,
            },
        });

        const idToken = await jwt.sign(
            { userId: newUser.id },
            process.env.ID_TOKEN_SECRET,
            {
                expiresIn: '7d',
            }
        );

        const accessToken = await jwt.sign(
            { userId: newUser.id },
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
                user: newUser,
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
