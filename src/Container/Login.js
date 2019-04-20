import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import {
  TextField,
  Button,
  Paper,
  LinearProgress,
  Snackbar
} from '@material-ui/core';

import SnackbarContent from '../Components/SnackbarContent';
import style from './Login.module.css';

const ErrorSnackbar = ({ open, onClose, message }) => (
  <Snackbar
    anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
    open={open}
    autoHideDuration={2200}
    onClose={onClose}
  >
    <SnackbarContent variant="error" message={message} onClose={onClose} />
  </Snackbar>
);
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

  fireError = () => {
    this.setState({ loginState: Login.loginStates.Failed });
  };

  handleClose = () => {
    this.setState({ loginState: Login.loginStates.Default });
  };

  render() {
    const failed = this.state.loginState === Login.loginStates.Failed;
    return (
      <Paper className={style.container}>
        <h1>選課系統</h1>
        <TextField
          autoFocus={true}
          error={failed}
          label="帳號"
          margin="dense"
        />
        <TextField error={failed} label="密碼" type="password" margin="dense" />
        <Button onClick={this.handleLogin}>Login</Button>
        {Login.reaction[this.state.loginState]}
        <Button onClick={this.fireError}>Test Error</Button>
        <ErrorSnackbar
          open={failed}
          onClose={this.handleClose}
          message="Authentication failed, please try again"
        />
      </Paper>
    );
  }
}

Login.loginStates = { Default: 0, Waiting: 1, Authenticated: 2, Failed: 3 };
Login.reaction = [
  '',
  <LinearProgress />,
  <Redirect from="/login" to="/select" />,
  ''
];

Login.propTypes = {
  setAuthentication: PropTypes.func.isRequired,
  location: PropTypes.object
};
export default Login;
