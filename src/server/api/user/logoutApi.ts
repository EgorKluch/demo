import { Express } from 'express';
import api from "#/constants/api";
import apiSuccess from "#/server/utils/apiSuccess";
import db from "#/server/libs/getKnex";
import {DbToken} from "#/server/types/dbEntities";

const logoutApi = (app: Express) => {
  app.get(api.users.logout(), async (req: any, res) => {
    const token = req.universalCookies.get('token');
    await db<DbToken>('tokens').where({token}).delete();
    req.universalCookies.remove('token');
    apiSuccess(res, {});
  });
};

export default logoutApi;
