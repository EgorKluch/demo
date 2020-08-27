import {Response} from "express";

const apiSuccess = <TData>(res: Response, data: TData) => {
  return res.send({status: 'success', data});
};

export default apiSuccess;
