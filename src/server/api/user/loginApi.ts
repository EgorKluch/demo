import {Express} from "express";
import db from "#/server/libs/getKnex";
import {DbToken, DbUser} from "#/server/types/dbEntities";
import apiSuccess from "#/server/utils/apiSuccess";
import debug from "#/server/utils/debug";
import randToken from "rand-token";
import {LoginRequest, LoginResponse} from "#/types/api/userApi";
import validationError from "#/server/errors/validationError";
import dbDate from "#/server/utils/dbDate";
import _ from 'lodash';
import api from "#/constants/api";
import validateForm from "#/server/utils/validateForm";
import formatFormValues from "#/server/utils/formatFormValues";
import loginFormModel from "#/forms/loginFormModel";
import validationErrors from "#/server/errors/validationErrors";
import errorMessages from "#/intl/errorMessages";

const loginApi = (app: Express) => {
  app.post(api.users.login(), async (req: any, res, next) => {
    debug(`Request: ${api.users.login()}`);

    const model = loginFormModel();
    const values = formatFormValues<LoginRequest>(model, req.body);
    const errors = await validateForm(model, values);

    if (errors) {
      return next(validationErrors(errors))
    }

    const user = await db<DbUser>('users').where({login: values.login}).first();

    if (!user) {
      return next(validationError('login', errorMessages.userNotFound));
    }

    if (!user.password) {
      await db<DbUser>('users')
        .update({password: values.password})
        .where({ id: user.id })
    } else if (user.password !== values.password) {
      return next(validationError('password', errorMessages.incorrectPassword));
    }

    const token = randToken.generate(32);
    await db<DbToken>('tokens').insert({
      userId: user.id,
      token,
      createDate: dbDate()
    });

    req.universalCookies.set('token', token, {
      httpOnly: true,
      sameSite: true,
    });

    apiSuccess<LoginResponse>(res, {
      user: _.omit(user, 'password')
    });
  });
};

export default loginApi;
