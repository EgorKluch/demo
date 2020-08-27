import accessDenied from "../errors/accessDenied";
import apiError from "../utils/apiError";
import debug from "#/server/utils/debug";
import userModel from "#/server/model/userModel";

export const auth = async (req: any, res: any, next: any) => {
  debug('Auth middleware');

  const user = await userModel.getCurrentUser(req);

  if (!user) {
    apiError(res, 403, accessDenied());
    return;
  }

  req.user = user;
  next();
};
