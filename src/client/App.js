import React from 'react';
import {
  Route, HashRouter, Switch, Redirect,
} from 'react-router-dom';
import Home from './components/Home';
import Tetris from './components/Tetris';

// Main React Component handling react-router
function App() {
  return (
    <HashRouter basename="/" hashType="noslash">
      <Switch>
        <Route
          path="/:roomName[:username]"
          component={({ location, history, match }) => (
            <Tetris
              location={location}
              history={history}
              match={match}
            />
          )}
        />
        <Route exact path="/" component={() => <Home />} />
        <Redirect to="/" />
      </Switch>
    </HashRouter>
  );
}

export default App;
