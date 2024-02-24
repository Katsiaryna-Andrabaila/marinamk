import checkFields from 'shared/apiUtils/checkFields';
import prisma from 'shared/apiUtils/prisma';
import { Service } from '@prisma/client';
import { NextRequest } from 'next/server';

export async function GET() {
    try {
        const services = JSON.stringify(await prisma.service.findMany());
        return new Response(services, {
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
    const data: Pick<Service, 'name' | 'category' | 'subcategory' | 'price'> =
        body;

    if (!checkFields(data, ['name', 'category', 'price'])) {
        return new Response('Some required fields are missing', {
            status: 400,
        });
    }

    try {
        const service = await prisma.service.create({
            data,
        });
        return new Response(JSON.stringify(service), {
            status: 201,
        });
    } catch (e) {
        console.error(e);
        return new Response('Service create error', {
            status: 500,
        });
    }
}

export async function PATCH(req: NextRequest) {
    const body: Service = await req.json();
    const data: Service = body;
    const { id, name, category, subcategory, price } = data;

    if (!checkFields(data, ['id'])) {
        return new Response('Service ID is missing', {
            status: 400,
        });
    }

    try {
        const service = await prisma.service.update({
            where: {
                id,
            },
            data: {
                name,
                category,
                subcategory,
                price,
            },
        });
        return new Response(JSON.stringify(service), {
            status: 200,
        });
    } catch (e) {
        console.error(e);
        return new Response('Update service error', {
            status: 500,
        });
    }
}

export async function DELETE(req: NextRequest) {
    const body = await req.json();
    const data: Pick<Service, 'id'> = body;

    if (!checkFields(data, ['id'])) {
        return new Response('Service ID is missing', {
            status: 400,
        });
    }

    try {
        await prisma.service.delete({
            where: {
                id: data.id,
            },
        });
        return new Response(null, {
            status: 204,
        });
    } catch (e) {
        console.error(e);
        return new Response('Service remove error', {
            status: 500,
        });
    }
}
