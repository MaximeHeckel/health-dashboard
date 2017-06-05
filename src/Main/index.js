import React from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import General from './General';

const Main = () => {
  return (
    <Switch>
      <Route path="/entry/:date" component={General}/>
      <Redirect from="/" to="/entry/today"/>
    </Switch>
  );
}

export default Main;
