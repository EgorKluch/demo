import debug from "#/server/utils/debug";
import apiError from "#/server/utils/apiError";
import errorMessages from "#/intl/errorMessages";
import {Express} from 'express';

const errorHandler = (app: Express) => {
  app.use((err: any, req: any, res: any, next: any) => {
    debug('Handle error');

    if (err.stack) {
      console.error(err.stack);
    }

    if (err instanceof Error) {
      console.error(err.message);
      apiError(res, 500, { message: errorMessages.internalError });
      next();
      return;
    }

    apiError(res, 500, err);
    next();
  });
};

export default errorHandler;
