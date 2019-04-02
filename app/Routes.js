import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import ConfigurePage from './containers/ConfigurePage';
import CustomDomainsPage from './containers/CustomDomainsPage';

export default () => (
  <App>
    <Switch>
      <Route path={routes.COUNTER} exact component={ConfigurePage} />
      <Route path={routes.HOME} exact component={HomePage} />
      <Route path={routes.CUSTOMDOMAINS} exact component={CustomDomainsPage} />
    </Switch>
  </App>
);
