import React from 'react';
import {
  Route, HashRouter, Switch, Redirect,
} from 'react-router-dom';
import Home from './components/Home';
import Tetris from './components/Tetris';

function App() {
  return (
    <HashRouter basename="/" hashType="noslash">
      <Switch>
        <Route path="/:roomName[:username]" component={(props) => <Tetris {...props} />} />
        <Route exact path="/" component={() => <Home />} />
        <Redirect to="/" />
      </Switch>
    </HashRouter>
  );
}

export default App;
