import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";

import App from "./components/container/App";

import "../assets/stylesheets/VacationApp.scss"

//TO DO
ReactDOM.render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
), document.getElementById("vacations-app"));