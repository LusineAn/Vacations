import React, {Component} from "react";
import {observer} from "mobx-react";

import {AppStore} from '../../stores/AppStore';

import NavBar from "../presentational/NavBar";
import Vacations from "../presentational/Vacations";
import Projects from "../presentational/Projects";
import Employees from "../presentational/Employees";
import Routes from "../../Routes";

class App extends Component {

    constructor() {
        super();
        this.state = {
            appStore: new AppStore()
        }
    }

    async componentWillMount() {
        this.state.appStore.loadData();
    }

    render() {
        return(
            <div>
                <Employees appStore={this.state.appStore}/>
            </div>
    )};
}

export default App;