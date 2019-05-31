import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import ConfigurePage from './containers/ConfigurePage';
import CustomDomainsPage from './containers/CustomDomainsPage';
import AboutPage from './containers/AboutPage';
import WhitelistPage from './containers/WhitelistPage';

export default () => (
  <App>
    <Switch>
      <Route path={routes.COUNTER} exact component={ConfigurePage} />
      <Route path={routes.HOME} exact component={HomePage} />
      <Route path={routes.CUSTOMDOMAINS} exact component={CustomDomainsPage} />
      <Route path={routes.ABOUT} exact component={AboutPage} />
      <Route path={routes.WHITELIST} exact component={WhitelistPage} />
    </Switch>
  </App>
);
