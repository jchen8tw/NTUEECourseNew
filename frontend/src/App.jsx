import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './Container/Login';
import Select from './Container/Select';
import Dashboard from './Container/Dashboard';
import NavBar from './Components/NavBar';
import './App.css';

class App extends Component {
  /*
  constructor(props) {
    super(props);
    this.state = { token: null, tabIndex: 0 };
  }
  setToken = token => {
    this.setState({ token: token });
  };
*/

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          {this.state.token && (
            <NavBar
              tabIndex={this.state.tabIndex}
              handleTabChange={this.handleTabChange}
            />
          )}
          <Switch>
            <Route exact path="/login" render={props => <Login {...props} />} />
            <Route
              path="/select"
              render={props => (
                <Select {...props} />
              )}
            />
            <Route
              path="/dashboard"
              render={props => (
                <Dashboard {...props} authenticated={!!this.state.token} />
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
