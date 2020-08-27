import {Response} from "express";
import {ApiError} from "#/types/api/api";
import debug from "#/server/utils/debug";

const apiError = <TData>(res: Response, statusCode: number, data: ApiError<TData>) => {
  return res.status(statusCode).send({status: 'error', data});
};

export default apiError;
