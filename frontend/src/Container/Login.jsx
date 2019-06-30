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
import style from './Login.module.css';
import { connect } from 'react-redux';
import { store_jwt, send_error } from '../redux/actions';

const mapDispatchToProps = dispatch => ({
  setToken: jwt => dispatch(store_jwt(jwt)),
  sendError: data => dispatch(send_error(data))
});
const mapStateToProps = state => ({ jwt: state.jwt });

function LoginForm({ login, data, loading, error }) {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const failed = !!error; // Efficiently cast error to bool
  return (
    <form
      onSubmit={e => {
        e.preventDefault(); // Prevent the page from refreshing
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
    </form>
  );
}

function Login(props) {
  if (!!props.jwt) {
    return <Redirect from="/login" to="/dashboard" />;
    // so select needs to check if token is valid
    // if not, dashboard will delete the token
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
            onError={error =>
              props.sendError(
                (error &&
                  error.graphQLErrors[0] &&
                  error.graphQLErrors[0].message) ||
                  'Authentication Failed'
              )
            }
          >
            {(login, { data, loading }) => (
              <LoginForm
                {...{
                  login,
                  data,
                  loading
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
