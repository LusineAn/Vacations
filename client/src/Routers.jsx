import React, {Component} from "react";
import {BrowserRouter, HashRouter, Switch, Route, Link} from "react-router-dom";

import Vacations from "./components/presentational/Vacations.jsx";
import Projects from "./components/presentational/Projects.jsx";
import Employees from "./components/presentational/Employees.jsx";

class Routers extends Component {

    render() {
        return (
            <HashRouter>
                <div>
                    <Switch>
                        <Route path='#vacations' component={Vacations}/>
                        <Route path='#projects' component={Projects}/>
                        <Route path='#employees' component={Employees}/>
                    </Switch>
                </div>
            </HashRouter>
        )};
};

export default Routers;