import React, { Component } from 'react';

class CommentPage extends Component {
  render() {
    return <>{this.props.match.params.id}</>;
  }
}
export default CommentPage;
