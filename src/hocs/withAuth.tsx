import React, {FC} from "react";
import {getCurrentUser} from "#/api/user/userSelectors";
import useSelector from "#/hooks/useSelector";
import LoginPage from "#/components/pages/LoginPage/LoginPage";

const withAuth = () => {
  return function(Component: FC) {
    return () => {
      const user = useSelector(getCurrentUser);

      if (!user) {
        return (
          <LoginPage/>
        )
      }

      return (
        <Component/>
      );
    };
  }
};

export default withAuth;
