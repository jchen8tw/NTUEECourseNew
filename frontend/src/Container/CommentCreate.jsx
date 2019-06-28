import React, { Component } from 'react';
import style from './CommentCreate.module.css';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { TextField, MenuItem, Typography } from '@material-ui/core';
import Rating from '../Components/Rating';
import { contentTemplate } from '../Components/contentTemplate';

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
let rateValue = 0;
function UseStateRating() {
  const [rate, setRate] = React.useState(0);
  return (
    <>
      <p>{rate}</p>
      <Rating
        emptySymbol="far fa-star fa-2x"
        fullSymbol="fas fa-star fa-2x"
        onClick={setRate}
        initialRating={rate}
      />
    </>
  );
}

class CommentCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '必修',
      rating: 0,
      content: ''
    };
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  handleRateChange = value => {
    console.log(value);
    console.log(this.state.rating);
    this.setState({ rating: value });
  };
  loadTemplate = () => {
    this.setState({ content: contentTemplate });
  };
  handleCommentSubmit = () => {};
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
            <Grid
              container
              xs={12}
              sm={6}
              md={4}
              className={style.gridStyle}
              justify="center"
              alignContent="space-around"
              direction="column"
            >
              <Grid>
                <Typography color="textSecondary" align="left">
                  推薦分數
                </Typography>
              </Grid>
              <Grid>
                <p>{this.state.rating}</p>
                <Rating
                  emptySymbol="far fa-star fa-2x"
                  fullSymbol="fas fa-star fa-2x"
                  onClick={this.handleRateChange}
                  initialRating={this.state.rating}
                />
                {/* <UseStateRating /> */}
              </Grid>
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
                rows="15"
                onChange={this.handleChange('content')}
                margin="normal"
                value={this.state.content}
                variant="outlined"
              />
            </Grid>
            <Grid md={12} sm={12} xs={12} className={style.buttonBox}>
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                onClick={this.loadTemplate}
              >
                載入模板
              </Button>
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                onClick={this.handleCommentSubmit}
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
