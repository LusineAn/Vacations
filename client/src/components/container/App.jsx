import React, {Component} from "react";

import NavBar from "../presentational/NavBar.jsx";
import Projects from "../presentational/Projects.jsx";
import Employees from "../presentational/Employees.jsx";

class App extends Component {

    constructor() {
        super();
        this.state = {
            projects: []
        }
    }

    render() {
        return(
            <div>
                <NavBar />
                <Projects />
                <Employees />
            </div>
        );
    }
}

export default App;