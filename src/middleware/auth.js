import { StatusCodes } from 'http-status-codes';
import { verifyJwt } from '../utils/jwt.js';
import CustomErrorApi from '../errors/CustomErrorApi.js';

const tokenAuth = async (req, res, next) => {
    const headers = req.headers.authorization;
    if (!headers || !headers.startsWith('Bearer')) {
        throw new CustomErrorApi('Unauthorized.', StatusCodes.UNAUTHORIZED);
    }
    const token = headers.split(' ')[1];
    try {
        const user = verifyJwt(token);
        req.user = { id: user.id, username: user.username };
        next();
    } catch (error) {
        throw new CustomErrorApi('Unauthorized.', StatusCodes.UNAUTHORIZED);
    }
};

// eslint-disable-next-line import/prefer-default-export
export { tokenAuth };
