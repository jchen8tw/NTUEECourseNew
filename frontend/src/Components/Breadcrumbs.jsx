import React from 'react';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import { Link, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

function Breadcrumb(props) {
  return (
    <Grid
      container
      style={{ padding: '1.5em 0.5em', backgroundColor: '#fafafa' }}
    >
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        arial-label="Breadcrumb"
      >
        <Link color="inherit" style={{ fontSize: '21px' }}>
          中
        </Link>
        <Link color="inherit" style={{ fontSize: '21px' }}>
          文
        </Link>
        <Typography color="textPrimary" style={{ fontSize: '21px' }}>
          字
        </Typography>
      </Breadcrumbs>
    </Grid>
  );
}
export default Breadcrumb;
