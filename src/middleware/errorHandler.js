"use strict";
import { StatusCodes } from "http-status-codes";
import CustomErrorApi from "../errors/CustomErrorApi.js";
import response from "../utils/response.js";

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomErrorApi) {
    return response(res, StatusCodes.INTERNAL_SERVER_ERROR, err.message);
  }

  return response(
    res,
    StatusCodes.INTERNAL_SERVER_ERROR,
    "Internal Server Error"
  );
};

export { errorHandler };
