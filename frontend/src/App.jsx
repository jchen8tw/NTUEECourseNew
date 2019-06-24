import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './Container/Login';
import Select from './Container/Select';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { token: null };
  }

  setToken = token => {
    this.setState({ token: token });
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route
              exact
              path="/login"
              render={props => <Login {...props} setToken={this.setToken} />}
            />
            <Route
              path="/select"
              render={props => (
                <Select {...props} authenticated={!!this.state.token} />
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
