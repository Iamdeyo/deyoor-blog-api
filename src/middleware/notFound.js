
import { StatusCodes } from 'http-status-codes';
import response from '../utils/response.js';

const notFound = (req, res) => {
    response(res, StatusCodes.NOT_FOUND, 'Route Not Found');
};

export default notFound;
