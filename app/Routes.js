import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import ConfigurePage from './containers/ConfigurePage';

export default () => (
  <App>
    <Switch>
      <Route path={routes.COUNTER} component={ConfigurePage} />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
