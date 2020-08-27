import {FieldType, ServerFormModel} from "#/components/common/Form/formTypes";
import required from "#/utils/validations/required";
import minLength from "#/utils/validations/minLength";
import {LoginRequest} from "#/types/api/userApi";

const loginFormModel = (): ServerFormModel<LoginRequest> => {
  return {
    fields: {
      login: {
        type: FieldType.input,
        validate: (value) => required()(value),
      },
      password: {
        type: FieldType.input,
        validate: (value) => required()(value) || minLength(6)(value),
      }
    },
  };
};

export default loginFormModel;
