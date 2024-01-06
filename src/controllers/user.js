import { StatusCodes } from 'http-status-codes';
import database from '../libs/prisma.js';
import asyncWrapper from '../middleware/asyncWrapper.js';
import response from '../utils/response.js';

const getAUser = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const data = await database.user.findUnique({
        where: { id },
        select: { username: true, displayPhoto: true, id: true },
    });
    return response(res, StatusCodes.OK, 'User found', data);
});

const deleteUser = asyncWrapper(async (req, res) => {
    const { id } = req.user;
    await database.user.delete({
        where: { id },
    });
    return response(res, StatusCodes.OK, 'User deleted successfully!');
});

export { getAUser, deleteUser };
