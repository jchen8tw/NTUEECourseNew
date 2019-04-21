import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {Button} from '@material-ui/core';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { loginState: Login.loginStates.Default };
    if (props.location.state && props.location.state.notLogin)
      alert('You are not allowed to view this page, please login first!');
  }

  handleLogin = () => {
    this.setState({ loginState: Login.loginStates.Waiting });
    setTimeout(
      () => {
        this.props.setAuthentication(true); // Need to change authentication before changing state
        this.setState({ loginState: Login.loginStates.Authenticated });
      }, // Dummy function, simulating server authentication
      3000
    );
  };

  render() {
    return (
      <React.Fragment>
        <p>This is login page</p>
        {Login.reaction[this.state.loginState]}
        <Button onClick={this.handleLogin}>Login</Button>
      </React.Fragment>
    );
  }
}

Login.loginStates = { Default: 0, Waiting: 1, Authenticated: 2, Failed: 3 };
Login.reaction = [
  <p>Press `Login` to login!</p>,
  <p>Loading... Please wait</p>,
  <Redirect from="/login" to="/select" />,
  <p>Authentication failed, please try again</p>
];

export default Login;
