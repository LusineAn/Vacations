import React, { Component } from "react";
import ReactDOM from "react-dom";

import Navbar from "../presentational/NavBar.jsx"
import Employees from "../presentational/Employees.jsx"

class FirstPage extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  render() {
    // const {seo_title} = this.state;

    return (
        <div id="first-page">
            <Navbar />
        </div>
    );
  }
}

export default FirstPage;

const wrapper = document.getElementById("create-article-form");
wrapper ? ReactDOM.render(<FormContainer />, wrapper) : false;
