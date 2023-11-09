import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcryptjs';
import asyncWrapper from '../middleware/asyncWrapper.js';
import response from '../utils/response.js';
import database from '../libs/prisma.js';
import { signJwt } from '../utils/jwt.js';

const register = asyncWrapper(async (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await database.user.create({
        data: { username, password: hashedPassword },
        select: {
            id: true,
            username: true,
        },
    });

    // jwt
    const token = signJwt(user, '7d');

    return response(res, StatusCodes.CREATED, 'User created successfully', {
        token,
    });
});

const login = asyncWrapper(async (req, res) => {
    const { username, password } = req.body;

    const user = await database.user.findUnique({
        where: { username },
    });

    if (!user) {
        return response(
            res,
            StatusCodes.BAD_REQUEST,
            'Invalid User or Password',
        );
    }

    const passwordIsMatch = await bcrypt.compare(password, user.password);

    if (!passwordIsMatch) {
        return response(
            res,
            StatusCodes.BAD_REQUEST,
            'Invalid User or Password',
        );
    }
    // jwt
    const token = signJwt(user, '7d');

    return response(res, StatusCodes.OK, 'User logged in successfully', {
        token,
    });
});

const me = asyncWrapper(async (req, res) => {
    const { id, username } = req.user;
    const post = await database.post.findMany({ where: { authorId: id } });
    const data = { id, username, post };
    return response(res, StatusCodes.OK, 'User found', data);
});

export { register, me, login };
