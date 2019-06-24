import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { AppBar, Toolbar, Tabs, Tab } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

const styles = {
  root: {
    flexGrow: 1
  },
  tabs: {
    flexGrow: 1
  }
};

const TabStyles = {
  labelContainer: {
    fontSize: '1.35rem'
  }
};

const EnlargedTab = withStyles(TabStyles)(Tab);
function NavBar({ classes, tabIndex, handleTabChange }) {
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Tabs
            className={classes.tabs}
            centered
            value={tabIndex}
            onChange={handleTabChange}
            scrollButtons="auto"
          >
            <EnlargedTab label="Home" component={Link} to="/dashboard" />
            <EnlargedTab label="選課" component={Link} to="/dashboard" />
            <EnlargedTab label="評價" component={Link} to="/dashboard" />
            <EnlargedTab
              label="Sweety Course"
              component={Link}
              to="/dashboard"
            />
          </Tabs>
          <IconButton aria-owns="account" aria-haspopup="true" color="inherit">
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavBar);
