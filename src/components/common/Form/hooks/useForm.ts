import {useContext} from "react";
import {formContext} from "#/components/common/Form/Form";
import {Form} from "#/components/common/Form/formTypes";

const useForm = <TValues>() => {
  const form = useContext<Form<TValues> | null>(formContext);
  if (!form) {
    console.error('No form');
  }
  return form;
};

export default useForm;
