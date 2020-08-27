import {RouteProps} from "react-router";
import MainPage from "#/components/pages/MainPage/MainPage";
import NotFoundPage from "#/components/pages/NotFoundPage";
import {PageName} from "#/types/PageName";

type Route = RouteProps & {
  name: PageName
};

const routes: Route[] = [{
  path: '/',
  exact: true,
  component: MainPage,
  name: PageName.main,
}, {
  path: '/',
  exact: false,
  component: NotFoundPage,
  name: PageName.notFound,
}];

export default routes;
