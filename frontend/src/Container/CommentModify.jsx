import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from './CommentModify.module.css';
import UserAvatar from '../Components/Avatar';

import { withStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography
} from '@material-ui/core';
import deepPurple from '@material-ui/core/colors/deepPurple';

import { contentTemplate } from '../Components/contentTemplate';
import { Mutation } from 'react-apollo';
import { Query } from 'react-apollo';
import {
  MODIFY_COMMENT_MUTATION,
  DELETE_COMMENT_MUTATION
} from '../graphql/mutation.js';
import { CONTENT_QUERY } from '../graphql/query';
import { send_success } from '../redux/actions';

const mapStateToProps = state => {
  return { student_id: state.student_id, token: state.jwt };
};
const mapDispatchToProps = dispatch => ({
  sendSuccess: data => dispatch(send_success(data))
});

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
  },
  purpleAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepPurple[500]
  },
  avatar: {
    margin: 10
  }
});
class CommentCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '必修',
      content: '',
      message: ''
    };
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  loadTemplate = () => {
    this.setState({ content: contentTemplate });
  };
  initQueryValue = (name, value) => {
    this.setState({ [name]: value });
  };
  deleteComment = () => {};
  getValue = idName => {
    let temp = document.getElementById(idName).value;
    if (idName === 'type') {
      this.setState({ type: '必修' });
      return temp;
    } else if (idName === 'content') {
      this.setState({ content: '' });
      return temp;
    } //(idName!=="type"||idName!=="content")
    else document.getElementById(idName).value = '';
    return temp;
  };
  render() {
    const { id } = this.props.match.params;
    const { classes } = this.props;
    const types = ['必修', '選修', '十選二', '專題'];
    return (
      <Query
        query={CONTENT_QUERY}
        variables={{ id }}
        onCompleted={data => {
          this.initQueryValue('type', data.getComment.type);
          this.initQueryValue('content', data.getComment.content);
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return <CircularProgress color="secondary" />;
          if (error) return `Error!${error.message}`;
          return (
            <Mutation
              mutation={MODIFY_COMMENT_MUTATION}
              onCompleted={data => this.props.sendSuccess(data.message)}
            >
              {modifyComment => (
                <form
                  className={style.allRoot}
                  onSubmit={e => {
                    e.preventDefault();
                    modifyComment({
                      variables: {
                        _id: id,
                        type: this.getValue('type'),
                        name: this.getValue('name'),
                        teacher: this.getValue('teacher'),
                        semester: this.getValue('semester'),
                        domain: this.getValue('domain'),
                        score: parseFloat(this.getValue('score')),
                        studyBefore: this.getValue('studyBefore'),
                        studyTogether: this.getValue('studyTogether'),
                        content: this.getValue('content'),
                        author: JSON.parse(atob(this.props.token.split('.')[1]))
                          .id
                      }
                    });
                  }}
                >
                  <Paper className={style.pageRoot}>
                    <Grid container spacing={24}>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        className={style.gridStyleAvater}
                      >
                        <UserAvatar query={true} />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        className={style.gridStyle}
                      >
                        <TextField
                          required
                          id="semester"
                          label="學期"
                          defaultValue={data.getComment.semester}
                          className={classes.textField}
                          margin="normal"
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        className={style.gridStyle}
                      >
                        <TextField
                          required
                          id="name"
                          label="課名"
                          defaultValue={data.getComment.name}
                          className={classes.textField}
                          margin="normal"
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        className={style.gridStyle}
                      >
                        <TextField
                          required
                          id="teacher"
                          label="開課教授"
                          defaultValue={data.getComment.teacher}
                          className={classes.textField}
                          margin="normal"
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        className={style.gridStyle}
                      >
                        <>
                          <TextField
                            id="type"
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
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        className={style.gridStyle}
                      >
                        {this.state.type === '必修' ? (
                          <TextField
                            id="domain"
                            disabled
                            label="領域(光電、CS...等，必修不填)"
                            className={classes.textField}
                            margin="normal"
                          />
                        ) : (
                          <TextField
                            id="domain"
                            label="領域"
                            className={data.getComment.domain}
                            margin="normal"
                          />
                        )}
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        className={style.gridStyle}
                      >
                        <TextField
                          id="score"
                          label="私心推薦指數(0~5分)"
                          required
                          defaultValue={data.getComment.score}
                          inputProps={{ min: 0, max: 5, step: 0.5 }}
                          placeholder="超過5分為5分，每0.5分為一等級"
                          type="number"
                          className={classes.textField}
                          InputLabelProps={{
                            shrink: true
                          }}
                          margin="normal"
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={6}
                        className={style.gridStyleStudy}
                      >
                        <TextField
                          id="studyBefore"
                          label="推薦預先修的課程"
                          className={classes.textFieldStudy}
                          defaultValue={data.getComment.studyBefore}
                          margin="normal"
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={6}
                        className={style.gridStyleStudy}
                      >
                        <TextField
                          id="studyTogether"
                          label="推薦一起修的課程"
                          defaultValue={data.getComment.studyTogether}
                          className={classes.textFieldStudy}
                          margin="normal"
                        />
                      </Grid>
                      <Grid
                        item
                        md={12}
                        sm={12}
                        xs={12}
                        className={style.gridStyle}
                      >
                        <TextField
                          id="content"
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
                      <Grid
                        item
                        md={12}
                        sm={12}
                        xs={12}
                        className={style.buttonBox}
                      >
                        <Mutation mutation={DELETE_COMMENT_MUTATION}>
                          {deleteComment => (
                            <Button
                              variant="outlined"
                              color="primary"
                              className={classes.button}
                              onClick={() => {
                                  window.confirm('確認刪除???')
                                deleteComment({ variables: { _id: id } });
                              }}
                            >
                              刪除文章!!!
                            </Button>
                          )}
                        </Mutation>

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
                          type="submit"
                        >
                          確認送出
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                </form>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

const connectedCommentCreate = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentCreate);

export default withStyles(styles)(connectedCommentCreate);
