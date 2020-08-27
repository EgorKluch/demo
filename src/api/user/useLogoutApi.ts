import useApiRequest, {ApiMethod} from "#/hooks/useApiRequest";
import useDispatch from "#/hooks/useDispatch";
import useReduxApi from "#/hooks/useReduxApi/useReduxApi";
import api from "#/constants/api";
import {setCurrentUser} from "#/api/user/userActions";
import {getCurrentUser} from "#/api/user/userSelectors";
import {useCookies} from "react-cookie";
import {User} from "#/types/api/userApi";

const useLogoutApi = () => {
  const request = useApiRequest();
  const dispatch = useDispatch();
  const [, , removeCookie] = useCookies(['token']);

  return useReduxApi<void, User | null>('user', async () => {
    await request(ApiMethod.get, api.users.logout());

    removeCookie('token');
    dispatch(setCurrentUser(null));
  }, getCurrentUser);
};

export default useLogoutApi;
