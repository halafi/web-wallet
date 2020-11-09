import * as React from 'react';
import { Route, RouteProps, Switch } from 'react-router-dom';
import Wallet from './scenes/Wallet';
import Overview from './scenes/Overview';

type Props = {
  wallets: string[];
  setWallets: (wallets: string[]) => void;
};

// TODO: wallets would be better as simple global state - React.Context
const Routes = ({ wallets, setWallets }: Props) => (
  <Switch>
    <Route component={Overview} path="/" exact />
    <Route
      path="/wallet"
      exact
      render={(props: RouteProps) => {
        // eslint-disable-next-line react/jsx-props-no-spreading
        return <Wallet {...props} wallets={wallets} setWallets={setWallets} />;
      }}
    />
    {/* <Route component={Singleplayer} path="/game" exact />
    <Route component={Leaderboard} path="/leaderboard" exact /> */}
    <Route component={Overview} />
  </Switch>
);

export default Routes;
