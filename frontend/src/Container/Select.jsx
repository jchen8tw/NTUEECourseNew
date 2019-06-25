import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
const mapStateToProps = state => {
  return {authenticated : state.jwt};
}
class Select extends Component {
  render() {
    return <p>This is select</p>;
  }
}
const ConnectedSelect = connect(mapStateToProps)(Select);
export default ConnectedSelect;
