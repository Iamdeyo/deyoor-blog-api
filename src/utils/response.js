const response = (res, statusCode, message, data = null, errors = null) => {
    res.status(statusCode).json({ message, data, errors });
};

export default response;
