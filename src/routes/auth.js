import express from 'express';
import { login, me, register } from '../controllers/auth.js';
import { tokenAuth } from '../middleware/auth.js';
import {
    validateRegisterAuth,
    validateAuth,
    validateLoginAuth,
} from '../middleware/authValidator.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.post(
    '/register',
    upload.single('image'),
    validateRegisterAuth,
    validateAuth,
    register,
);
router.post('/login', validateLoginAuth, validateAuth, login);
router.get('/me', tokenAuth, me);

export default router;
