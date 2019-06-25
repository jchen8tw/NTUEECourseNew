import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "./Container/Login";
import Select from "./Container/Select";
import Admin from "./Container/Admin";

import Dashboard from "./Container/Dashboard";
import NavBar from "./Components/NavBar";
import "./App.css";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { token: state.jwt };
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { tabIndex: 0 };
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          {this.props.token && (
            <NavBar
              tabIndex={this.state.tabIndex}
              handleTabChange={this.handleTabChange}
            />
          )}
          <Switch>
            <Route exact path="/login" render={props => <Login {...props} />} />
            {!this.props.token && (
              <Redirect
                from="*"
                to={{ pathname: "/login", state: { notLogin: true } }}
              />
            )}
            <Route path="/select" render={props => <Select {...props} />} />
            <Route
              path="/dashboard"
              render={props => (
                <Dashboard {...props} authenticated={!!this.state.token} />
              )}
            />
            <Route path="/admin" component={Admin} />
            <Redirect from="/" to="/login" />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
const connectedApp = connect(mapStateToProps)(App);
export default connectedApp;