import React, {FC} from "react";
import {Provider} from "react-redux";
import store from "#/redux/store";
import {Route, StaticRouter, Switch,} from "react-router-dom";
import {ConnectedRouter} from 'connected-react-router'
import routes from "#/components/App/routes";
import history from "#/history";
import ConnectedIntlProvider from "#/components/App/ConnectedIntlProvider";
import './App.scss';

type Props = {
  url?: string,
}

const App: FC<Props> = (props) => {
  const renderRoutes = () => {
    return routes.map((route, index) => {
      return (
        <Route key={index} {...route}/>
      )
    })
  };

  const renderRouter = () => {
    if (process.env.SSR) {
      const context = {};
      return (
        <StaticRouter location={props.url} context={context}>
          <Switch>{renderRoutes()}</Switch>
        </StaticRouter>
      )
    } else {
      return (
        <ConnectedRouter history={history}>
          <Switch>{renderRoutes()}</Switch>
        </ConnectedRouter>
      );
    }
  };

  return (
    <Provider store={store}>
      <ConnectedIntlProvider>
        {renderRouter()}
      </ConnectedIntlProvider>
    </Provider>
  )
};

export default App;
