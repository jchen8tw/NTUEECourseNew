import React, { Component } from 'react';
import style from './CommentCreate.module.css';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

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
  textFieldComment: {
    maxWidth: '950px',
    minWidth: '350px',
    width: '85%',
    marginTop: '30px',
    marginBottom: '30px'
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing.unit
  }
});

class CommentCreate extends Component {
  state = {
    type: '必修',
    score: 0
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
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
                  label="領域(光電、CS...等，必修不填)"
                  className={classes.textField}
                  margin="normal"
                />
              ) : (
                <TextField
                  id="standard-name"
                  label="領域"
                  className={classes.textField}
                  margin="normal"
                />
              )}
            </Grid>
            <Grid xs={12} sm={6} md={4} className={style.gridStyle}>
              <TextField
                id="standard-number"
                label="私心推薦指數"
                value={this.state.score}
                max={5}
                onChange={this.handleChange('score')}
                type="number"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
                margin="normal"
              />
            </Grid>
            <Grid xs={12} md={6} className={style.gridStyleStudy}>
              <TextField
                id="standard-name"
                label="推薦預先修的課程"
                className={classes.textFieldStudy}
                margin="normal"
              />
            </Grid>
            <Grid xs={12} md={6} className={style.gridStyleStudy}>
              <TextField
                id="standard-name"
                label="推薦一起修的課程"
                className={classes.textFieldStudy}
                margin="normal"
              />
            </Grid>
            <Grid md={12} sm={12} xs={12} className={style.gridStyle}>
              <TextField
                id="outlined-name"
                fullWidth={true}
                label="課程小卦"
                className={classes.textFieldComment}
                multiline
                rows="10"
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid md={12} sm={12} xs={12} className={style.buttonBox}>
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
              >
                載入模板
              </Button>
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
              >
                確認送出
              </Button>
            </Grid>
          </Grid>
        </Paper>
        {/* </Mutation> */}
      </div>
    );
  }
}
export default withStyles(styles)(CommentCreate);
