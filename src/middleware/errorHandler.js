import { StatusCodes } from 'http-status-codes';
import CustomErrorApi from '../errors/CustomErrorApi.js';
import response from '../utils/response.js';

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
    console.log(err);
    if (err instanceof CustomErrorApi) {
        return response(res, err.statusCode, err.message);
    }

    if (Object.prototype.hasOwnProperty.call(err, 'meta')) {
        return response(
            res,
            StatusCodes.BAD_REQUEST,
            'Bad Request',
            null,
            err.meta,
        );
    }

    return response(
        res,
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
    );
};

export default errorHandler;
