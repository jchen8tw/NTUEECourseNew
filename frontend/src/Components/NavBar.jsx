import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { AppBar, Toolbar, Tabs, Tab, Menu, MenuItem } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { logout } from '../redux/actions';

const styles = {
  tabs: {
    flexGrow: 1
  },
  toolbar: {
    minHeight: '100%'
  }
};

const TabStyles = {
  labelContainer: {
    fontSize: '1.35rem'
  }
};

const EnlargedTab = withStyles(TabStyles)(Tab);

const mapDispatchToProps = dispatch => {
  return { logout: data => dispatch(logout(data)) };
};

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { anchorEl: null };
  }

  handleClick = event => {
    this.setState({ anchorEl: event.target });
  };

  handleClose = _ => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, tabIndex, handleTabChange, logout } = this.props;
    if (window.location.href.match(/admin$/)) return <p>you are admin</p>;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className={classes.toolbar}>
            <Tabs
              className={classes.tabs}
              centered
              value={tabIndex}
              onChange={handleTabChange}
              scrollButtons="auto"
            >
              <EnlargedTab label="Home" component={Link} to="/dashboard" />
              <EnlargedTab label="選課" component={Link} to="/select" />
              <EnlargedTab label="評價" component={Link} to="/dashboard" />
              <EnlargedTab
                label="Sweety Course"
                component={Link}
                to="/dashboard"
              />
            </Tabs>
            <IconButton
              aria-owns="account"
              aria-haspopup="true"
              color="inherit"
              onClick={this.handleClick}
              style={{ padding: 0 }}
            >
              <AccountCircle style={{ fontSize: '2.1rem' }} />
            </IconButton>
            <Menu
              anchorEl={this.state.anchorEl}
              open={!!this.state.anchorEl}
              onClose={this.handleClose}
            >
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
};

const connectedNavBar = connect(
  undefined,
  mapDispatchToProps
)(NavBar);
export default withStyles(styles)(connectedNavBar);
