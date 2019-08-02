import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '/imports/ui/reducers';

import { renderRoutes } from '../imports/startup/client/routes';

Meteor.startup(() => {
  render(
    <Provider store={createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
      {renderRoutes()}
    </Provider>,
    document.getElementById('react-target')
  );
});
