"use strict";
import { StatusCodes } from "http-status-codes";
import CustomErrorApi from "../errors/CustomErrorApi.js";
import response from "../utils/response.js";

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomErrorApi) {
    return response(res, err.statusCode, err.message);
  }

  if (err.hasOwnProperty("meta")) {
    return response(
      res,
      StatusCodes.BAD_REQUEST,
      "Bad Request",
      null,
      err.meta
    );
  }

  return response(
    res,
    StatusCodes.INTERNAL_SERVER_ERROR,
    "Internal Server Error"
  );
};

export { errorHandler };
