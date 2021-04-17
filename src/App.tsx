import { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./screen/Home";
import Login from "./screen/Login";
import NotFound from "./screen/NotFound";

function App() {
  const isLoggedIn = false;
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact>
            {isLoggedIn ? (
              <Home />
            ) : (
              <Login />
            )}
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
