import "bootstrap-sass/assets/stylesheets/_bootstrap.scss";

import * as React from "react";
import * as ReactDOM from "react-dom";

import MainStore from "./stores/main-store";

import MainAppContainer from "./components/main/main-page";

import HomePage from "./components/home/home-page";
import AboutPage from "./components/about/about-page";

MainStore.registerComponent("Home Page", HomePage, true);
MainStore.registerComponent("About Page", AboutPage);

ReactDOM.render(<MainAppContainer />, document.getElementById("container"));
