import myCache from '../libs/nodeCache.js';

const getCacheData = (req, res, next) => {
    const cacheKey = `__deyoorBlogAPI__${req.originalUrl}`;
    const cacheData = myCache.get(cacheKey);
    if (cacheData === undefined) {
        next();
    } else {
        req.cacheData = cacheData;
        next();
        // return response(res, StatusCodes.OK, "All posts found", cacheData);
    }
};

export { getCacheData, myCache };
