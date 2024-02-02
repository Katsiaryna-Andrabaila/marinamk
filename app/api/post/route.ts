import { NextApiRequestWithUserId } from 'shared/apiTypes';
import authGuard from 'shared/apiUtils/authGuard';
import checkFields from 'shared/apiUtils/checkFields';
import prisma from 'shared/apiUtils/prisma';
import { Post } from '@prisma/client';
import { NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

const postsHandler = createRouter<NextApiRequestWithUserId, NextApiResponse>();

postsHandler.post(async (req, res) => {
    // на `authorId` не содержится в теле запроса
    // он хранится в самом запросе
    const data: Pick<Post, 'date' | 'authorId'> = JSON.parse(req.body);

    if (!checkFields(data, ['date'])) {
        res.status(400).json({
            message: 'Some required fields are missing',
        });
    }

    // дополняем данные полем `authorId`
    data.authorId = req.userId;

    try {
        const post = await prisma.post.create({
            data,
        });
        res.status(200).json(post);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Post create error' });
    }
});

postsHandler.put(async (req, res) => {
    const data: Pick<Post, 'date'> & {
        postId: string;
    } = JSON.parse(req.body);

    if (!checkFields(data, ['date'])) {
        res.status(400).json({ message: 'Some required fields are missing' });
    }

    try {
        const post = await prisma.post.update({
            // гарантия того, что пользователь обновляем принадлежащий ему пост
            where: {
                id_authorId: { id: data.postId, authorId: req.userId },
            },
            data: {
                date: data.date,
            },
        });
        res.status(200).json(post);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Update post error' });
    }
});

postsHandler.delete(async (req, res) => {
    const id = req.query.id as string;

    if (!id) {
        return res.status(400).json({
            message: 'Post ID is missing',
        });
    }

    try {
        const post = await prisma.post.delete({
            // гарантия того, что пользователь удаляет принадлежащий ему пост
            where: {
                id_authorId: {
                    id,
                    authorId: req.userId,
                },
            },
        });
        res.status(200).json(post);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Post remove error' });
    }
});

export default authGuard(postsHandler);
