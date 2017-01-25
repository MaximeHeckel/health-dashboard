import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { Router, browserHistory } from 'react-router';
import configureStore from './global/store';
import { client } from './global/graphql';
import Main from './Main';

const store = configureStore();

const rootRoute = {
  childRoutes: [{
    path: '/',
    component: 'div',
    indexRoute: { onEnter(nextState, replace) {
      replace('/entry');
    },
    },
    childRoutes: [
      Main,
    ],
  }],
};

ReactDOM.render(
  <ApolloProvider store={store} client={client}>
    <Router history={browserHistory}>{rootRoute}</Router>
  </ApolloProvider>,
  document.getElementById('app')
);
