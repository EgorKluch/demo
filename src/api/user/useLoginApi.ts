import useReduxApi from "#/hooks/useReduxApi/useReduxApi";
import useApiRequest, {ApiMethod} from "#/hooks/useApiRequest";
import api from "#/constants/api";
import {LoginRequest, LoginResponse} from "#/types/api/userApi";
import md5 from 'md5';
import {getCurrentUser} from "#/api/user/userSelectors";
import useDispatch from "#/hooks/useDispatch";
import {setCurrentUser} from "#/api/user/userActions";

const useLoginApi = () => {
  const request = useApiRequest();
  const dispatch = useDispatch();

  return useReduxApi('user', async ({ login, password }: LoginRequest) => {
    const response = await request<LoginResponse>(ApiMethod.post, api.users.login(), {
      body: { login, password: md5(password) }
    });
    dispatch(setCurrentUser(response.user));
  }, getCurrentUser);
};

export default useLoginApi;
