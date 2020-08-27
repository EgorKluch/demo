import {Form, FormErrors, FormModel} from "../formTypes";
import {createForm} from "final-form";
import {useMemo, useRef} from "react";
import useLastRef from "#/hooks/useLastRef";

const useCreateForm = <TValues>(model: FormModel<TValues>): Form<TValues> => {
  const onSubmitDoneRef = useRef<((errors?: FormErrors<TValues>) => void) | null>(null);
  const onSubmitRef = useLastRef(model.onSubmit);

  const finalForm = useMemo(() => {
    return createForm<TValues>({
      onSubmit: (...args) => {
        return new Promise((resolve) => {
          onSubmitRef.current(...args);
          onSubmitDoneRef.current = (errors?: FormErrors<TValues>) => {
            resolve(errors);
          }
        });
      },
    });
  }, []);

  return useMemo((): Form<TValues> => {
    return {
      ...finalForm,
      model,
      submitSuccess() {
        if (!onSubmitDoneRef.current || !finalForm.getState().submitting) {
          return;
        }
        onSubmitDoneRef.current();
        onSubmitDoneRef.current = null;
      },
      submitFailed(errors: FormErrors<TValues>) {
        if (!onSubmitDoneRef.current || !finalForm.getState().submitting) {
          return;
        }
        onSubmitDoneRef.current(errors);
        onSubmitDoneRef.current = null;
      }
    };
  }, [model, finalForm]);
};

export default useCreateForm;
