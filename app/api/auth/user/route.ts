import prisma from 'shared/apiUtils/prisma';
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    const idToken = req.cookies.get(process.env.COOKIE_NAME);

    if (!idToken) {
        return new Response('ID token must be provided', {
            status: 401,
        });
    }

    try {
        const decodedToken = (await jwt.verify(
            idToken.value,
            process.env.ID_TOKEN_SECRET
        )) as unknown as { userId: string };

        if (!decodedToken || !decodedToken.userId) {
            return new Response('Invalid token', {
                status: 403,
            });
        }

        const user = await prisma.user.findUnique({
            where: { id: decodedToken.userId },

            select: {
                id: true,
                email: true,
                name: true,
            },
        });

        if (!user) {
            return new Response('User not found', {
                status: 404,
            });
        }

        const accessToken = await jwt.sign(
            { userId: user.id },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: '1d',
            }
        );

        return new Response(
            JSON.stringify({
                user,
                accessToken,
            }),
            {
                status: 200,
            }
        );
    } catch (e) {
        console.error(e);
        return new Response('User get error', {
            status: 500,
        });
    }
}
