"use strict";
import fs from "fs";
import cloudinary from "cloudinary";
import { StatusCodes } from "http-status-codes";
import CustomErrorApi from "../errors/CustomErrorApi.js";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
});

const upload = (req, res, next) => {
  if (!req.files || !req.files.image) {
    next();
  } else {
    const image = req.files.image.tempFilePath;
    cloudinary.v2.uploader
      .unsigned_upload(image, "express-blog-api")
      .then((result) => {
        req.body.image = result.url;

        // Manually delete the temporary file
        fs.unlinkSync(image);
        next();
      })
      .catch((err) => {
        console.log(err);

        // Manually delete the temporary file
        fs.unlinkSync(image);
        throw new CustomErrorApi(
          "Unable to upload file to cloudinary",
          StatusCodes.BAD_REQUEST
        );
      });
  }
};

export { upload };
