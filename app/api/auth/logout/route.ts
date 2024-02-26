import { serialize } from 'cookie';

export async function POST() {
    return new Response('Logout success', {
        status: 200,
        headers: {
            'Set-Cookie': serialize(process.env.COOKIE_NAME, '', {
                httpOnly: true,
                maxAge: 0,
                path: '/',
                sameSite: true,
                secure: true,
            }),
        },
    });
}
