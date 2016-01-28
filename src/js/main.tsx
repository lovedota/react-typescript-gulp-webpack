import "jquery";
import "block-ui";
import "bootstrap/js";
import "bootstrap/css";
import "bootstrap-select/js";
import "bootstrap-select/css";

$.blockUI.defaults.message = "Loading...";
$.blockUI.defaults.css = {
   border: "none",
   "background-color": "transparent"
};

 /* tslint:disable:no-unused-variable */
import * as React from "react";
/* tslint:enable:no-unused-variable */

import * as ReactDOM from "react-dom";

import MainStore from "./stores/main-store";

import MainAppContainer from "./components/main/main-page";

import HomePage from "./components/home/home-page";
import AboutPage from "./components/about/about-page";

MainStore.registerComponent("Home Page", HomePage, true);
MainStore.registerComponent("About Page", AboutPage);

ReactDOM.render(<MainAppContainer />, document.getElementById("container"));
