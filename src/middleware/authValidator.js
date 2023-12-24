import { body, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import response from '../utils/response.js';

const validateRegisterAuth = [
    body('username')
        .exists()
        .withMessage('Username is required')
        .trim()
        .isLength({ min: 4 })
        .withMessage('Username must be at least 4 characters long'),

    body('password')
        .exists()
        .withMessage('Password is required')
        .trim()
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .custom((value) => {
            // Check if the password contains at least one uppercase letter
            if (!/[A-Z]/.test(value)) {
                throw new Error(
                    'Password must contain at least one uppercase letter',
                );
            }

            // Check if the password contains at least one lowercase letter
            if (!/[a-z]/.test(value)) {
                throw new Error(
                    'Password must contain at least one lowercase letter',
                );
            }

            return true;
        }),
];
const validateLoginAuth = [
    body('username')
        .exists()
        .withMessage('Username is required')
        .trim()
        .isLength({ min: 4 })
        .withMessage('Username must be at least 4 characters long'),

    body('password')
        .exists()
        .withMessage('Password is required')
        .trim()
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .custom((value) => {
            // Check if the password contains at least one uppercase letter
            if (!/[A-Z]/.test(value)) {
                throw new Error(
                    'Password must contain at least one uppercase letter',
                );
            }

            // Check if the password contains at least one lowercase letter
            if (!/[a-z]/.test(value)) {
                throw new Error(
                    'Password must contain at least one lowercase letter',
                );
            }

            return true;
        }),
];

const validateAuth = (req, res, next) => {
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

export { validateRegisterAuth, validateLoginAuth, validateAuth };
