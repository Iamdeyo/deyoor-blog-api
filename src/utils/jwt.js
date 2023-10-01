'use strict';
import jwt from "jsonwebtoken";


const signJwt = (user, lifeSpan) => {
  return jwt.sign( { id: user.id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: lifeSpan,
  });
};

const verifyJwt = (token)=> {
    return jwt.verify(token, process.env.JWT_SECRET)
}

export {signJwt, verifyJwt}


