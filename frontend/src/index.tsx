import React from "react";
import { render } from "react-dom";
//import createHistory from "history/createBrowserHistory";
//import { ConnectedRouter } from "react-router-redux";
//import { connect, Provider } from "react-redux";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

const styles = require("./index.scss");
//import "./index"; // alternative import method
import Header from "./components/Header";
import Login from "./components/Login";

import ContactPage from "./pages/contact";
import AboutPage from "./pages/about";
import LandingPage from "./pages/landing";

// Think about “actions” as “events”, “reducers” as “listeners”,
// and when later we meed with mapStateToProps function, it literally means
// “getComponentPropertiesFromState”

// See https://stackoverflow.com/questions/47493958/react-is-undefined-cannot-read-property-createelement-of-undefined
render(
  <Router>
    <Header />
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/about" component={AboutPage} />
      <Route exact path="/contact" component={ContactPage} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
