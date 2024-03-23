import checkFields from 'shared/apiUtils/checkFields';
import prisma from 'shared/apiUtils/prisma';
import { Post } from '@prisma/client';
import { NextRequest } from 'next/server';

export async function GET() {
    try {
        const posts = JSON.stringify(await prisma.post.findMany());
        return new Response(posts, {
            status: 200,
        });
    } catch (e) {
        console.error(e);
        return new Response('Internal server error', {
            status: 500,
        });
    }
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const data: Pick<
        Post,
        'date' | 'clientName' | 'clientEmail' | 'procedure' | 'isAvailable'
    > = body;

    if (!checkFields(data, ['date', 'isAvailable'])) {
        return new Response('Some required fields are missing', {
            status: 400,
        });
    }

    if (body.date < new Date()) {
        return new Response('Unable to add slot with expired date', {
            status: 400,
        });
    }

    try {
        const post = await prisma.post.create({
            data,
        });
        return new Response(JSON.stringify(post), {
            status: 201,
        });
    } catch (e) {
        console.error(e);
        return new Response('Post create error', {
            status: 500,
        });
    }
}

export async function PATCH(req: NextRequest) {
    const body: Post = await req.json();
    const data: Post = body;
    const { id, date, clientName, clientEmail, procedure, isAvailable } = data;

    if (!checkFields(data, ['id'])) {
        return new Response('Post ID is missing', {
            status: 400,
        });
    }

    try {
        const post = await prisma.post.update({
            where: {
                id,
            },
            data: {
                date,
                clientName,
                clientEmail,
                procedure,
                isAvailable,
            },
        });
        return new Response(JSON.stringify(post), {
            status: 200,
        });
    } catch (e) {
        console.error(e);
        return new Response('Update post error', {
            status: 500,
        });
    }
}

export async function DELETE(req: NextRequest) {
    const body = await req.json();
    const data: Pick<Post, 'id'> = body;

    if (!checkFields(data, ['id'])) {
        return new Response('Post ID is missing', {
            status: 400,
        });
    }

    try {
        await prisma.post.delete({
            where: {
                id: data.id,
            },
        });
        return new Response(null, {
            status: 204,
        });
    } catch (e) {
        console.error(e);
        return new Response('Post remove error', {
            status: 500,
        });
    }
}
