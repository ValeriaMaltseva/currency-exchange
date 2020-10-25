import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Main from 'routes/Main';
import Details from 'routes/Details';
import Success from 'routes/Success';

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/main" component={Main} />
          <Route path="/details" component={Details} />
          <Route path="/success" component={Success} />

          <Redirect to="/main" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
