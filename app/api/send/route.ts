import { Resend } from 'resend';
import { NextRequest } from 'next/server';
import { EmailMessage } from '../../../src/entities/emailMessage';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
    const { name, email, date } = await req.json();

    try {
        const data = await resend.emails.send({
            from: 'no-reply <admin@marinamk.net>', // your verified domain
            to: `${email}`, // the email address you want to send a message
            subject: `${name} has a message!`,
            react: EmailMessage({ name, date }),
        });

        if (data.data) {
            return new Response(JSON.stringify(data), {
                status: 200,
            });
        } else {
            return new Response(JSON.stringify(data), {
                status: 403,
            });
        }
    } catch (error) {
        console.error(error);
        return new Response('Send email error', {
            status: 500,
        });
    }
}
