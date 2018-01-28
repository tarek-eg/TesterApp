import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./style/style.css";
import "./style/boosted/css/orangeHelvetica.css";
import "./style/boosted/css/orangeIcons.css";
import "./style/boosted/css/boosted.css";
import "../node_modules/toastr/build/toastr.css";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createHistory from "history/createBrowserHistory";
import { routerMiddleware, ConnectedRouter } from "react-router-redux";
import { Route, Switch } from "react-router-dom";
import { composeWithDevTools } from "redux-devtools-extension";

import Header from "./components/header";
import Signin from "./components/auth/signin";
import Signup from "./components/auth/signup";
import Signout from "./components/auth/signout";
import RequireAuth from "./components/auth/require_auth";
import TestersTable from "./components/view_testers";
import TesterNew from "./components/tester_new";
import TesterDeatils from "./components/tester_details";
import reducers from "./reducers/index";
import ReduxThunk from "redux-thunk"; //
import { AUTH_USER } from "./actions/types";

const history = createHistory();
const middleware = routerMiddleware(history);

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(ReduxThunk, middleware))
);
const token = localStorage.getItem("token");

if (token) {
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Header />
        <Switch>
          <Route path="/testers/new" component={RequireAuth(TesterNew)} />
          <Route path="/testers/:id" component={RequireAuth(TesterDeatils)} />
          <Route path="/signin" component={Signin} />
          <Route path="/signout" component={Signout} />
          <Route path="/signup" component={Signup} />
          <Route exact path="/" component={RequireAuth(TestersTable)} />
          <Route path="/**" component={RequireAuth(TestersTable)} />
        </Switch>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
