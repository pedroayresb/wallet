import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import Edit from './pages/Edit';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/carteira" component={ Wallet } />
      <Route exact path="/edit/:id" component={ Edit } />
    </Switch>
  );
}

export default App;
