import React, { Component } from 'react';

import deepPurple from '@material-ui/core/colors/deepPurple';
import Avatar from '@material-ui/core/Avatar';

import { Query } from 'react-apollo';
import { NICKNAME_QUERY } from '../graphql/query';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  purpleAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepPurple[500]
  },
  avatar: {
    margin: 10
  },
  gridStyleAvatar: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'nowrap',
    alignItems: 'center',
    padding: '10px 0 0 10px!important'
  },
  nickname: {
    fontSize: '1.17em'
  }
});

class UserAvatar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { classes } = this.props;
    return (
      <Query query={NICKNAME_QUERY} fetchPolicy="network-only">
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return `error!${error.message}`;
          return (
            <div className={classes.gridStyleAvatar}>
              <Avatar className={classes.purpleAvatar}>
                {data.me.nickname[0] || 'A'}
              </Avatar>
              <h4 className={classes.nickname}>
                {data.me.nickname || 'Anonymous'}
              </h4>
            </div>
          );
        }}
      </Query>
    );
  }
}
export default withStyles(styles)(UserAvatar);
