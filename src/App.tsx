import { HashRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  const isLoggedIn = false;
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact>
            {isLoggedIn ? "Home" : "Login"}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
