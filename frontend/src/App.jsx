import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { send_success, send_error } from './redux/actions';
import { Snackbar } from '@material-ui/core';
import SnackbarContent from './Components/SnackbarContent';
import Login from './Container/Login';
import Select from './Container/Select';
import Admin from './Container/Admin';
import CommentList from './Container/CommentList';
import Dashboard from './Container/Dashboard';
import NavBar from './Components/NavBar';
import ProfileEditor from './Container/ProfileEditor';
import style from './App.module.css';

const mapStateToProps = state => ({
  token: state.jwt,
  errorMessage: state.errorMessage,
  successMessage: state.successMessage
});
const mapDispatchToProps = dispatch => ({
  resetSuccess: () => dispatch(send_success(null)),
  resetError: () => dispatch(send_error(null))
});

function App(props) {
  return (
    <BrowserRouter>
      <div className={style.app}>
        {props.token && <NavBar />}
        <Switch>
          <Route exact path="/login" render={props => <Login {...props} />} />
          {!props.token && (
            <Redirect
              from="*"
              to={{ pathname: '/login', state: { notLogin: true } }}
            />
          )}
          <Route path="/admin" component={Admin} />
          {!!props.token && JSON.parse(atob(props.token.split('.')[1])).id === 'ADMIN' && (
          <Redirect to="/admin" />)}
          <Route path="/profileEditor" component={ProfileEditor} />
          <Route path="/select" render={props => <Select {...props} />} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/commentlist" component={CommentList} />
          <Redirect from="/" to="/login" />
          
          {/* <Route path="/commentlist/:id?" component={CommentPage} /> */}
          
          )}
        </Switch>
      </div>
      {props.successMessage && (
        <Snackbar
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          open={!!props.successMessage}
          autoHideDuration={2200}
          onClose={props.resetSuccess}
        >
          <SnackbarContent
            variant="success"
            message={props.successMessage}
            onClose={props.resetSuccess}
          />
        </Snackbar>
      )}
      {props.errorMessage && (
        <Snackbar
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          open={!!props.errorMessage}
          autoHideDuration={2200}
          onClose={props.resetError}
        >
          <SnackbarContent
            variant="error"
            message={props.errorMessage}
            onClose={props.resetError}
          />
        </Snackbar>
      )}
    </BrowserRouter>
  );
}
const connectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
export default connectedApp;
