import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
const mapStateToProps = state => {
  return {authenticated : state.jwt};
}
class Select extends Component {
  render() {
    const authenticated = !!this.props.authenticated;
    if (!authenticated)
      return (
        <Redirect
          from="/select"
          to={{ pathname: '/login', state: { notLogin: true } }}
        />
      );
    return <p>This is select</p>;
  }
}
const ConnectedSelect = connect(mapStateToProps)(Select);
export default ConnectedSelect;
