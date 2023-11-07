"use strict";

import dashify from "dashify";
import { StatusCodes } from "http-status-codes";
import { database } from "../libs/prisma.js";
import asyncWrapper from "../middleware/asyncWrapper.js";
import response from "../utils/response.js";
import { myCache } from "../libs/nodeCache.js";

const getPosts = asyncWrapper(async (req, res) => {
  const { tag } = req.query;

  if (req.cacheData) {
    return response(res, StatusCodes.OK, "All posts found", req.cacheData);
  }

  const posts = await database.post.findMany({
    where: { ...(tag ? { tags: { has: tag } } : {}) },
  });

  const cacheKey = `__deyoorBlogAPI__${req.originalUrl}`;
  myCache.set(cacheKey, posts, 3600);

  return response(res, StatusCodes.OK, "All posts found", posts);
});

const getAPost = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  if (req.cacheData) {
    return response(res, StatusCodes.OK, "All posts found", req.cacheData);
  }

  const post = await database.post.findUnique({ where: { id: id } });

  const cacheKey = `__deyoorBlogAPI__${req.originalUrl}`;
  myCache.set(cacheKey, post, 3600);

  return response(res, StatusCodes.OK, "post found", post);
});

const createPost = asyncWrapper(async (req, res) => {
  const { title, content, tags, image } = req.body;
  const { id: userId } = req.user;
  // slug
  const date = Date.now();
  const slug = dashify(title + "-" + date.toString());

  const post = await database.post.create({
    data: {
      title,
      content,
      authorId: userId,
      slug,
      tags,
      image,
    },
  });
  return response(res, StatusCodes.CREATED, "post created sucessfully", post);
});

const editPost = asyncWrapper(async (req, res) => {
  const { title, content, tags, image } = req.body;
  const { id } = req.params;
  const { id: userId } = req.user;

  // slug
  const date = Date.now();
  const slug = dashify(title + "-" + date.toString());

  const post = await database.post.update({
    where: { id: id, authorId: userId },
    data: {
      title,
      content,
      slug,
      tags,
      image,
    },
  });
  return response(res, StatusCodes.CREATED, "post updated sucessfully", post);
});

const deletePost = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const post = await database.post
    .delete({ where: { id: id, authorId: req.user.id } })
    .catch((err) => err.meta);
  if (post.cause) {
    return response(res, StatusCodes.BAD_REQUEST, post.cause);
  }
  return response(res, StatusCodes.OK, "post deleted sucessfully");
});

export { getPosts, createPost, getAPost, editPost, deletePost };
