import jwt from 'jsonwebtoken';

const signJwt = (user, lifeSpan) =>
    jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: lifeSpan,
    });

const verifyJwt = (token) => jwt.verify(token, process.env.JWT_SECRET);

export { signJwt, verifyJwt };
