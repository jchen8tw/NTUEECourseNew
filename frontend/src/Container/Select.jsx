import React, { Component } from 'react';
import { connect } from 'react-redux';
import BreadCrumbs from '../Components/Breadcrumbs';
const mapStateToProps = state => {
  return { authenticated: state.jwt };
};
class Select extends Component {
  render() {
    return (
      <div>
        <BreadCrumbs />
        <p>This is select</p>
      </div>
    );
  }
}
const ConnectedSelect = connect(mapStateToProps)(Select);
export default ConnectedSelect;
