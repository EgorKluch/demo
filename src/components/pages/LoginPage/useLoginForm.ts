import useLoginApi from "#/api/user/useLoginApi";
import {useEffect, useMemo} from "react";
import {FormModel} from "#/components/common/Form/formTypes";
import {LoginRequest} from "#/types/api/userApi";
import useCreateForm from "#/components/common/Form/hooks/useCreateForm";
import isValidationError from "#/utils/isValidationError";
import {useIntl} from "react-intl";
import loginFormModel from "#/forms/loginFormModel";
import _ from 'lodash';

export type LoginFormValues = LoginRequest;

const useLoginForm = () => {
  const [, loginApi, loginState] = useLoginApi();
  const intl = useIntl();

  const model = useMemo((): FormModel<LoginFormValues> => {
    return {
      ...loginFormModel(),
      onSubmit: (values) => loginApi(values),
    };
  }, []);

  const form = useCreateForm(model);

  useEffect(() => {
    if (loginState.isSuccess) {
      form.submitSuccess();
    }
  }, [loginState.isSuccess]);

  useEffect(() => {
    if (loginState.isFailed) {
      if (isValidationError(loginState.error)) {
        const { data } = loginState.error;
        form.submitFailed(data.errors);
      }
    }
  }, [loginState.isFailed, intl.locale]);

  return form;
};

export default useLoginForm;
