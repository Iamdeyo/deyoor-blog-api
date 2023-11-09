import { body, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import response from '../utils/response.js';

const validateCreatePost = [
    body('title')
        .exists()
        .withMessage('Title is required')
        .isLength({ min: 5 })
        .withMessage('Title must be at least 5 characters long'),

    body('content')
        .exists()
        .withMessage('Content is required')
        .isLength({ min: 10 })
        .withMessage('Content must be at least 10 characters long'),

    body('tags')
        .optional()
        .custom((tags) => {
            if (tags === undefined || Array.isArray(tags)) {
                return true; // It's either undefined or an array
            }
            return false; // It's not an array
        })
        .withMessage('Tags must be an array if provided'),
];
const validateEditPost = [
    body('title')
        .exists()
        .withMessage('Title is required')
        .isLength({ min: 5 })
        .withMessage('Title must be at least 5 characters long'),

    body('content')
        .exists()
        .withMessage('Content is required')
        .isLength({ min: 10 })
        .withMessage('Content must be at least 10 characters long'),

    body('tags')
        .optional()
        .custom((tags) => {
            if (tags === undefined || Array.isArray(tags)) {
                return true; // It's either undefined or an array
            }
            return false; // It's not an array
        })
        .withMessage('Tags must be an array if provided'),
];

const validatePost = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return response(
            res,
            StatusCodes.BAD_REQUEST,
            'Invalid Request',
            null,
            errors.array(),
        );
    }
    return next();
};

export { validateCreatePost, validateEditPost, validatePost };
