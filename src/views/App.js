import React from 'react';
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { history } from '../history';
import { PrivateRoute } from '../components/privateRoute';
import routes from '../routes'

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          {
            routes ? routes.map((route, i) => {
              let Component = route.private ? PrivateRoute : Route;
              return (
                <Component key={i} exact={route.exact ? true : false} path={route.path} component={route.component} />
              )
            }
            ) : ""
          }
          <Redirect from="*" to="/dashboard" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
