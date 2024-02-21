import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { EmailMessage } from '../../../src/entities/emailMessage';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
    const { name, email, date, time } = await req.json();

    try {
        const data = await resend.emails.send({
            from: 'Hello <rayden@sonya.dev>', // your verified domain
            to: `${email}`, // the email address you want to send a message
            subject: `${name} has a message!`,
            react: EmailMessage({ name, date, time }),
        });

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error });
    }
}
