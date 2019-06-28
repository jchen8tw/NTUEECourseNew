import React, { Component } from 'react';
import style from './CommentCreate.module.css';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { TextField, MenuItem, Typography } from '@material-ui/core';
import Rating from '../Components/Rating';

import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { COMMENT_CREATE_MUTATION } from '../graphql/mutation.js';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 250,
    paddingLeft: '0.1%',
    position: 'inline-block'
  },
  textFieldStudy: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 340,
    paddingLeft: '0.1%'
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
});

class CommentCreate extends Component {
  state = {
    type: '必修'
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  handleRateChange = value => {
    this.setState({ rating: value });
  };
  render() {
    const { classes } = this.props;
    const types = ['必修', '選修', '十選二', '專題'];
    return (
      <div className={style.allRoot}>
        {/* <Mutation mutation={COMMENT_CREATE_MUTATION}> */}
        <Paper className={style.pageRoot}>
          <Grid container spacing={24}>
            <Grid xs={12} sm={6} md={4} className={style.gridStyle}>
              <TextField
                required
                id="standard-required"
                label="學期"
                defaultValue="107-2"
                className={classes.textField}
                margin="normal"
              />
            </Grid>
            <Grid xs={12} sm={6} md={4} className={style.gridStyle}>
              <TextField
                required
                id="standard-required"
                label="課名"
                defaultValue=""
                className={classes.textField}
                margin="normal"
              />
            </Grid>
            <Grid xs={12} sm={6} md={4} className={style.gridStyle}>
              <TextField
                required
                id="standard-required"
                label="開課教授"
                defaultValue=""
                className={classes.textField}
                margin="normal"
              />
            </Grid>
            <Grid xs={12} sm={6} md={4} className={style.gridStyle}>
              <>
                <TextField
                  id="standard-select-type"
                  select
                  label="類別"
                  className={classes.textField}
                  value={this.state.type}
                  onChange={this.handleChange('type')}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                  helperText="選擇課程類別"
                  margin="normal"
                >
                  {types.map(type => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </TextField>
              </>
            </Grid>
            <Grid xs={12} sm={6} md={4} className={style.gridStyle}>
              {this.state.type === '必修' ? (
                <TextField
                  id="standard-name"
                  disabled
                  label="領域(必修不用填)"
                  className={classes.textField}
                  margin="normal"
                />
              ) : (
                <TextField
                  id="standard-name"
                  label="領域(必修不用填)"
                  className={classes.textField}
                  margin="normal"
                />
              )}
            </Grid>
            <Grid
              container
              xs={12}
              sm={6}
              md={4}
              className={style.gridStyle}
              justify="center"
              alignContent="space-around"
              direction='column'
            >
              <Grid>
                <Typography color="textSecondary" align='left'>評價</Typography>
              </Grid>
              <Grid item>
              <Rating onChange={this.handleRateChange} />
              </Grid>
            </Grid>
            <Grid xs={12} md={6} className={style.gridStyle}>
              <TextField
                id="standard-name"
                label="推薦預先修的課程"
                className={classes.textFieldStudy}
                margin="normal"
              />
            </Grid>
            <Grid xs={12} md={6} className={style.gridStyle}>
              <TextField
                id="standard-name"
                label="推薦一起修的課程"
                className={classes.textFieldStudy}
                margin="normal"
              />
            </Grid>
          </Grid>
        </Paper>

        {/* </Mutation> */}
      </div>
    );
  }
}
export default withStyles(styles)(CommentCreate);
