import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import PrivateRoute from '../../ui/components/PrivateRoute';

import AuthPageSignIn from '../../ui/pages/AuthPageSignIn';
import HomePage from '../../ui/pages/HomePage';
import TagsPage from '../../ui/pages/TagsPage';
import PlayListsPage from '../../ui/pages/PlaylistsPage'
import NotFoundPage from '../../ui/pages/NotFoundPage';

const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Switch>
      <Route path="/login" component={AuthPageSignIn} />
      <PrivateRoute exact path="/" component={HomePage} />
      <PrivateRoute path="/tags" component={TagsPage} />
      <PrivateRoute path="/playlists" component={PlayListsPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </Router>
);
