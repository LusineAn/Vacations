import React, { Component } from "react";

import Input from "../presentational/Input.jsx";
import UsersData from "./UsersData.jsx"

import '../../../assets/App.css';

class App extends Component {

    constructor() {
        super();
        this.state = {
          seo_title: ""
        };
    
        this.handleChange = this.handleChange.bind(this);
      }
    
      handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
      }

      render() {
        const {seo_title} = this.state;
    
        return (
          <div className="my-article-form">
            <h1>My React App!</h1>
            <Input
                text="SEO_title"
                label="seo_title"
                type="text"
                id="seo_title"
                value={seo_title}
                handleChange={this.handleChange}
          />
          <UsersData/>
          </div>
        );
      }
}

export default App;