import express from 'express';
import { tokenAuth } from '../middleware/auth.js';
import { deleteUser, getAUser } from '../controllers/user.js';

const router = express.Router();

router.get('/:id', getAUser);
router.delete('/', tokenAuth, deleteUser);

export default router;
