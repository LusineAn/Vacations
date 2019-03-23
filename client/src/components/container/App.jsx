import React, {Component} from "react";

import NavBar from "../presentational/NavBar";
import Vacations from "../presentational/Vacations";
import Projects from "../presentational/Projects";
import Employees from "../presentational/Employees";
import Routes from "../../Routes";
import FromContainer from "../ReactComponents/FormContainer"

class App extends Component {

    constructor() {
        super();
        this.state = {
            projects: []
        }
    }

    // getApiUrl() {
    //     const {tz, msg} = this.state;
    //     const host = 'http://localhost:8081';
    //     return host + '/' + tz + '/' + msg + '.json';
    // }

    render() {
        return(
            <div>
                <Projects />
            </div>
        )};
}

export default App;