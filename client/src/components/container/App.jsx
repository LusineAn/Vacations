import React from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

import {AppStore} from "../../stores/AppStore";

import Vacations from "../presentational/Vacations";
import Projects from "../presentational/Projects";
import Employees from "../presentational/Employees";

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            appStore: new AppStore()
        }
    }

    async componentDidMount() {
        this.state.appStore.loadData();
    }

    render() {
        return(
            <Router>
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <ul className="navbar-nav mr-auto">
                            <li><Link to={'/'} className="nav-link">Vacations</Link></li>
                            <li><Link to={'/projects'} className="nav-link">Projects</Link></li>
                            <li><Link to={'/employees'} className="nav-link">Employees</Link></li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route exact path='/' render={() => <Vacations appStore={this.state.appStore}/> }/>
                        <Route path='/projects' render={() => <Projects appStore={this.state.appStore}/> }/>
                        <Route path='/employees' render={() => <Employees appStore={this.state.appStore}/> }/>
                    </Switch>
                </div>
            </Router>
    )};
}

export default App;