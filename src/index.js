import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import configureStore from './global/store';
import { client } from './global/graphql';
import Main from './Main';

const store = configureStore();

ReactDOM.render(
  <ApolloProvider store={store} client={client}>
    <Router>
      <div>
        <Route
          exact
          path="/"
          component={Main}
        />
        <Route path="/entry" component={Main}/>
      </div>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);
