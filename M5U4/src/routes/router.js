// dont touch this file

import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//pages
import Todo from "../pages/Todo";
import Signup from "../pages/Signup";

export default class Router extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Todo} />
            <Route path="/signup" exact component={Signup} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
