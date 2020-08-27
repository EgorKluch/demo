import useForm from "./useForm";

const useField = <TValues>(name: keyof TValues) => {
  const form = useForm<TValues>();
  if (!form) {
    return null;
  }
  return form.model.fields[name];
};

export default useField;
