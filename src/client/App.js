import React from 'react';
import { Route, HashRouter } from 'react-router-dom';

import Home from './components/Home';
import Lobby from './components/Game/Lobby';

function App() {
  return (
    <HashRouter basename="/" hashType="noslash">
      <Route exact path="/" component={() => <Home />} />
      <Route path="/:roomName[:username]" component={(props) => <Lobby {...props} />} />
    </HashRouter>
  );
}

export default App;
