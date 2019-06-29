import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import {
  TextField,
  Button,
  Paper,
  LinearProgress,
  Snackbar
} from '@material-ui/core';

import { LOGIN_MUTATION } from '../graphql/mutation';
import SnackbarContent from '../Components/SnackbarContent';
import style from './Login.module.css';
import { connect } from 'react-redux';
import { store_jwt } from '../redux/actions';

const mapDispatchToProps = dispatch => {
  return {
    setToken: jwt => dispatch(store_jwt(jwt))
  };
};
const mapStateToProps = state => {
  return { jwt: state.jwt };
};

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

function LoginForm({ login, data, loading, error }) {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarTriggered, setSnackbarTriggered] = useState(false);
  const failed = !!error; // Efficiently cast error to bool
  return (
    <form
      onSubmit={e => {
        e.preventDefault(); // Prevent the page from refreshing
        setSnackbarTriggered(false);
        login({ variables: { account, password } });
      }}
    >
      <TextField
        autoFocus={true}
        error={failed}
        label="帳號"
        margin="dense"
        value={account}
        onChange={e => setAccount(e.target.value)}
      />
      <TextField
        error={failed}
        label="密碼"
        type="password"
        margin="dense"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Button type="submit">Login</Button>
      {loading && <LinearProgress color="secondary" />}
      {data && <Redirect from="/login" to="/dashboard" />}
      <ErrorSnackbar
        open={failed && !snackbarTriggered}
        onClose={() => setSnackbarTriggered(true)}
        message={
          (error && error.graphQLErrors[0] && error.graphQLErrors[0].message) ||
          'Authentication Failed'
        }
      />
    </form>
  );
}

function Login(props) {
  if (!!props.jwt) {
    return <Redirect from="/login" to="/dashboard" />;
    // so select needs to check if token is valid
    // if not, select will delete the token
  } else {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100%'
        }}
      >
        <Paper className={style.container}>
          <h1 className={style.title}>選課系統</h1>
          <Mutation
            mutation={LOGIN_MUTATION}
            onCompleted={data => props.setToken(data.login.raw)}
          >
            {(login, { data, loading, error }) => (
              <LoginForm
                {...{
                  login,
                  data,
                  loading,
                  error
                }}
              />
            )}
          </Mutation>
        </Paper>
      </div>
    );
  }
}
Login.propTypes = {
  setToken: PropTypes.func.isRequired,
  location: PropTypes.object
};
const connectedLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
export default connectedLogin;
