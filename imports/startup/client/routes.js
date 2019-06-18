import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import AuthPageSignIn from '../../ui/pages/AuthPageSignIn';
import HomePage from '../../ui/pages/HomePage';
import NotFoundPage from '../../ui/pages/NotFoundPage';

const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" component={AuthPageSignIn}/>
      <Route path="/home" component={HomePage}/>
      <Route component={NotFoundPage}/>
    </Switch>
  </Router>
);
