import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { send_success } from './redux/actions';
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
  resetSuccess: () => dispatch(send_success(null))
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
          <Route path="/select" render={props => <Select {...props} />} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/commentlist" component={CommentList} />
          {/* <Route path="/commentlist/:id?" component={CommentPage} /> */}
          <Route path="/admin" component={Admin} />
          <Route path="/profileEditor" component={ProfileEditor} />
          <Redirect from="/" to="/login" />
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
    </BrowserRouter>
  );
}
const connectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
export default connectedApp;
