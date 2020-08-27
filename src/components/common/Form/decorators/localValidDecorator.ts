const localValidDecorator = (form: any) => {
  const getState = form.getState;
  form.getState = () => {
    const state = getState();
    let localValid = !state.hasSubmitErrors || state.dirtySinceLastSubmit;
    if (localValid) {
      Object.keys(state.errors || {}).find((field) => {
        if (state.dirtyFields[field]) {
          localValid = false;
          return true;
        }
        return false;
      });
    }

    return {
      ...getState(),
      localValid
    };
  };

  return () => {
    form.getState = getState;
  }
};

export default localValidDecorator;
