import React, {Component} from "react";

import NavBar from "../presentational/NavBar.jsx";
import Routers from "../../Routers.jsx";

class App extends Component {

    constructor() {
        super();
        this.state = {
            projects: []
        }
    }

    getApiUrl() {
        const {tz, msg} = this.state;
        const host = 'http://localhost:8081';
        return host + '/' + tz + '/' + msg + '.json';
    }

    fetchCurrentTime() {
        fetch(this.getApiUrl())
          .then(resp => resp.json())
          .then(resp => {
            const currentTime = resp.dateString;
            this.setState({currentTime})
          })
      }

    render() {
        return(
            <div>
                <NavBar />
                <Routers />
            </div>
        )};
}

export default App;