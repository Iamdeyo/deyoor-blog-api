"use strict";
import express from "express";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import 'express-async-errors'
import authRouter from "./routes/auth.js";
import postRouter from "./routes/post.js";
import notFound from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
dotenv.config();

/**
 * Application level middleware
 **/
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));


app.get('/', express.static('public'))
app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);

/**
 * Error handlers
 **/
app.use(errorHandler);
app.use(notFound);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
