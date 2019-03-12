import React, { Component } from "react";

import Input from "../jnjComponents/Input.jsx/index.js";
import UsersData from "../container/UsersData.jsx"

import '../../../assets/App.css';

class App extends Component {
}

export default App;

constructor() {
  super();
  this.state = {
    seo_title: ""
  };

}

handleChange(event) {
  this.setState({ [event.target.id]: event.target.value });
}

render() {
  const {seo_title} = this.state;

  return (
    <div className="my-article-form">
      <h1>My React App!</h1>
      
    <UsersData/>
    </div>
  );
}