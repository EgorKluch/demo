import {Express} from "express";
import loginApi from "./user/loginApi";
import logoutApi from "./user/logoutApi";

export const initApi = (app: Express) => {
  loginApi(app);
  logoutApi(app);
};