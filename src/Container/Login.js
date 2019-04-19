import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button, Paper, LinearProgress } from '@material-ui/core';

import SnackBar from '../Components/SnackBar';

const style = {
  container: {
    margin: '0 auto',
    maxWidth: '450px',
    padding: '5%',
    display: 'flex',
    flexDirection: 'column'
  }
};
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
    const classes = this.props.classes;
    return (
      <Paper className={classes.container}>
        <h1>選課系統</h1>
        <TextField label="帳號" margin="dense" />
        <TextField label="密碼" type="password" margin="dense" />
        <Button onClick={this.handleLogin}>Login</Button>
        {Login.reaction[this.state.loginState]}
      </Paper>
    );
  }
}

Login.loginStates = { Default: 0, Waiting: 1, Authenticated: 2, Failed: 3 };
Login.reaction = [
  '',
  <LinearProgress />,
  <Redirect from="/login" to="/select" />,
  <SnackBar variant="error" message="Authentication failed, please try again" />
];

Login.propTypes = {
  setAuthentication: PropTypes.func.isRequired,
  location: PropTypes.object
};
export default withStyles(style)(Login);
