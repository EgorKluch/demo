import db from "../libs/getKnex";
import {DbToken, DbUser} from "../types/dbEntities";
import {Request} from "express";
import _ from 'lodash';

const userModel = {
  async getCurrentUser(req: Request) {
    const sessionToken = req.universalCookies.get('token');

    if (!sessionToken) {
      return null;
    }

    const token = await db<DbToken>('tokens')
      .select()
      .where({ token: sessionToken })
      .first();

    if (!token) {
      return null
    }

    const user = await db<DbUser>('users')
      .where({ id: token.userId })
      .first();

    if (!user) {
      return null;
    }

    return user;
  },

  async getCurrentUserForClient(req: Request) {
    const user = await this.getCurrentUser(req);
    if (!user) {
      return null;
    }

    return _.omit(user, 'password');
  }
};

export default userModel;
