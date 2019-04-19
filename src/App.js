import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { NavLink, Switch, Route, Redirect } from 'react-router-dom';
import Login from './Container/Login';
import Select from './Container/Select';
import { Button } from '@material-ui/core';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: false };
  }

  setAuthentication = authenticated => {
    this.setState({ authenticated: authenticated });
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Button component={NavLink} to="/select">
            Select
          </Button>
          <Switch>
            <Route
              exact
              path="/login"
              render={props => (
                <Login {...props} setAuthentication={this.setAuthentication} />
              )}
            />
            <Route
              path="/select"
              render={props => (
                <Select {...props} authenticated={this.state.authenticated} />
              )}
            />
            <Redirect from="/" to="/login" />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
