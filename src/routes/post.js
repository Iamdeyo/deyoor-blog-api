/* eslint-disable import/extensions */

import express from 'express';
import {
    createPost,
    deletePost,
    editPost,
    getAPost,
    getPosts,
} from '../controllers/post.js';
import { upload } from '../middleware/upload.js';
import { tokenAuth } from '../middleware/auth.js';
import {
    validateCreatePost,
    validateEditPost,
    validatePost,
} from '../middleware/postValidator.js';
import { getCacheData } from '../middleware/myCache.js';

const router = express.Router();

router.get('/', getCacheData, getPosts);
router.get('/:id', tokenAuth, getCacheData, getAPost);
router.post(
    '/',
    tokenAuth,
    upload,
    validateCreatePost,
    validatePost,
    createPost,
);
router.patch(
    '/:id',
    tokenAuth,
    upload,
    validateEditPost,
    validatePost,
    editPost,
);
router.delete('/:id', tokenAuth, deletePost);

export default router;
