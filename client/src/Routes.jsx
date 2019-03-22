import React, {Component} from "react";
import {BrowserRouter, HashRouter, Switch, Route, Link} from "react-router-dom";

import Vacations from "./components/presentational/Vacations";
import Projects from "./components/presentational/Projects";
import Employees from "./components/presentational/Employees";

class Routes extends Component {

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path='/vacations' component={Vacations}/>
                        <Route path='localhost:8080/projects' component={Projects}/>
                        <Route path='employees' component={Employees}/>
                    </Switch>
                </div>
            </BrowserRouter>
        )};
};

export default Routes;