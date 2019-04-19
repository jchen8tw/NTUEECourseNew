import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    console.log(Login);
    this.state = { loginState: Login.loginStates.Default };
  }

  handleLogin = () => {
    this.setState({ loginState: Login.loginStates.Waiting });
    setTimeout(
      () => this.setState({ loginState: Login.loginStates.Authenticated }), // Dummy function, simulating server authentication
      3000
    );
  };

  render() {
    return (
      <React.Fragment>
        <p>This is login page</p>
        {Login.reaction[this.state.loginState]}
        <button onClick={this.handleLogin}>Login</button>
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
