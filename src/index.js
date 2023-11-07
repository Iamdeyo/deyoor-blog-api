"use strict";
import express from "express";
import helmet from "helmet";
import { xss } from "express-xss-sanitizer";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import compression from "compression";
import morgan from "morgan";
import "express-async-errors";
import authRouter from "./routes/auth.js";
import postRouter from "./routes/post.js";
import notFound from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { shouldCompress } from "./middleware/compression.js";

const app = express();
dotenv.config();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, check back in 5 minutes.",
});

/**
 * Application level middleware
 **/
app.use(morgan("dev"));
app.use(helmet());
app.use(xss());
app.use(limiter);
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));
app.use(compression({ filter: shouldCompress }));

app.get("/", express.static("public"));
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
