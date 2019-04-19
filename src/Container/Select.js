import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Select extends Component {
  render() {
    const authenticated = this.props.authenticated;
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
export default Select;
