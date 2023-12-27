import dashify from 'dashify';
import { StatusCodes } from 'http-status-codes';
import database from '../libs/prisma.js';
import asyncWrapper from '../middleware/asyncWrapper.js';
import response from '../utils/response.js';
import myCache from '../libs/nodeCache.js';

const getPosts = asyncWrapper(async (req, res) => {
    const { tag } = req.query;

    if (req.cacheData) {
        return response(res, StatusCodes.OK, 'All posts found', req.cacheData);
    }

    const posts = await database.post.findMany({
        where: { ...(tag ? { tags: { has: tag } } : {}) },
    });

    const cacheKey = `__deyoorBlogAPI__${req.originalUrl}`;
    myCache.set(cacheKey, posts, 1800);

    return response(res, StatusCodes.OK, 'All posts found', posts);
});

const getAPost = asyncWrapper(async (req, res) => {
    const { id } = req.params;

    if (req.cacheData) {
        return response(res, StatusCodes.OK, 'post found', req.cacheData);
    }

    const post = await database.post.findUnique({ where: { slug: id } });

    const cacheKey = `__deyoorBlogAPI__${req.originalUrl}`;
    myCache.set(cacheKey, post, 600);

    return response(res, StatusCodes.OK, 'post found', post);
});

function calculateReadingTime(text, wordsPerMinute = 200) {
    const words = text.split(/\s+/).length;
    const minutes = words / wordsPerMinute;
    return Math.ceil(minutes);
}

const createPost = asyncWrapper(async (req, res) => {
    const { title, content, tags } = req.body;
    const { id: userId } = req.user;

    const readTime = calculateReadingTime(content);

    // slug
    const date = Date.now();
    const slug = dashify(`${title}-${date.toString()}`);
    const image = req.file ? req.file.path : null;
    const post = await database.post.create({
        data: {
            title,
            content,
            authorId: userId,
            slug,
            tags,
            image,
            readTime,
        },
    });
    return response(res, StatusCodes.CREATED, 'post created sucessfully', post);
});

const editPost = asyncWrapper(async (req, res) => {
    const { title, content, tags } = req.body;
    const { id } = req.params;
    const { id: userId } = req.user;

    // slug
    const date = Date.now();
    const slug = dashify(`${title}-${date.toString()}`);
    const image = req.file ? req.file.path : null;

    const readTime = calculateReadingTime(content);

    const commonData = { title, content, slug, tags, readTime };
    const updateData = image ? { ...commonData, image } : commonData;

    const post = await database.post.update({
        where: { id, authorId: userId },
        data: updateData,
    });

    return response(res, StatusCodes.CREATED, 'post updated sucessfully', post);
});

const deletePost = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const post = await database.post
        .delete({ where: { id, authorId: req.user.id } })
        .catch((err) => err.meta);
    if (post.cause) {
        return response(res, StatusCodes.BAD_REQUEST, post.cause);
    }
    return response(res, StatusCodes.OK, 'post deleted sucessfully');
});

export { getPosts, createPost, getAPost, editPost, deletePost };
