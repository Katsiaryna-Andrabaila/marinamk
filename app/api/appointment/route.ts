import prisma from 'shared/apiUtils/prisma';

export async function GET() {
    try {
        const slots = JSON.stringify(
            await prisma.post.findMany({
                where: {
                    isAvailable: true,
                },
            })
        );
        return new Response(slots, {
            status: 200,
        });
    } catch (e) {
        console.error(e);
        return new Response('Internal server error', {
            status: 500,
        });
    }
}
