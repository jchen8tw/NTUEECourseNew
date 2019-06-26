import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import { Link as Anchor, Grid, Typography } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { withStyles } from '@material-ui/core/styles';

const style = theme => ({
  root: {
    padding: '1rem 0.5em',
    backgroundColor: '#fafafa'
  },
  link: {
    fontSize: '21px',
    '&[href]:hover': {
      color: '#000'
    }
  }
});

function Breadcrumb({ classes, url }) {
  let categories = url.split('/');
  let pathPrefix = categories.splice(0, 2)[1];
  let currentCategory = categories.splice(-1, 1);
  let path = `/${pathPrefix}/`;
  if (categories.length === 0 && !currentCategory.length) return null;
  return (
    <Grid container className={classes.root}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        arial-label="Breadcrumb"
      >
        <div />
        {/* dummy <div>, renders an extra seperator*/}
        {categories.map((name, index) => {
          path += name;
          return (
            <Anchor
              key={`${url}-breadcrumb-${index}`}
              color="inherit"
              className={classes.link}
              component={Link}
              to={path}
            >
              {name}
            </Anchor>
          );
        })}
        <Typography color="textPrimary" className={classes.link}>
          {currentCategory[0]}
        </Typography>
      </Breadcrumbs>
    </Grid>
  );
}
export default withStyles(style)(Breadcrumb);
