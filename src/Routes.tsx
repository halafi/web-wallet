import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Wallet from './scenes/Wallet';
import Overview from './scenes/Overview';

const Routes = () => (
  <Switch>
    <Route component={Overview} path="/" exact />
    <Route component={Wallet} path="/wallet" exact />
    {/* <Route component={Singleplayer} path="/game" exact />
    <Route component={Leaderboard} path="/leaderboard" exact /> */}
    <Route component={Overview} />
  </Switch>
);

export default Routes;
