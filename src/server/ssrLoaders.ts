import {PageName} from "#/types/PageName";
import {Request} from "express";
import userModel from "#/server/model/userModel";
import store from "#/redux/store";
import {setCurrentUser} from "#/api/user/userActions";

type SsrLoaders = Record<string, (req: Request) => Promise<void>>;

const ssrLoaders: SsrLoaders = {
  async [PageName.all](req) {
    const user = await userModel.getCurrentUserForClient(req);
    store.dispatch(setCurrentUser(user));
  },
};

export default ssrLoaders;
