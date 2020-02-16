// Good repo for inspiration: https://github.com/theskillwithin/untitled
// structure: https://medium.com/@Charles_Stover/optimal-file-structure-for-react-applications-f3e35ad0a145
import * as React from "react";
import * as ReactDOM from "react-dom";
//import { Hello } from "../components/Hello";
import Login from "../components/Login";
// <Hello compiler="Typescript" framework="React" bundler="Webpack" />
//import Login from "../components/Login/hooks";
//const styles = require("../scss/app.module.scss");
//import "../scss/app.module";

ReactDOM.render(
  <>
    <Login />
  </>,
  document.getElementById("root")
);
