import React, { Component } from 'react';
import style from './CommentPage.module.css';
import { Query, Mutation } from 'react-apollo';
import { CONTENT_QUERY, NICKNAME_QUERY } from '../graphql/query';
import { connect } from 'react-redux';
import { RESPONSE_MUTATION } from '../graphql/mutation';
import UserAvatar from '../Components/Avatar';

import { withStyles } from '@material-ui/core/styles';
import { Paper, CircularProgress, TextField, Button } from '@material-ui/core';
const mapStateToProps = state => {
  return { student_id: state.student_id, token: state.jwt };
};
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textFieldComment: {
    maxWidth: '950px',
    minWidth: '350px',
    width: '90%',
    margin: '10px 5%',
    textAlign: 'right'
  },
  button: {
    margin: theme.spacing.unit
  }
});

class CommentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    };
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  handleResponseSubmit = () => {
    console.log(this.state.content);
  };
  render() {
    const { id } = this.props.match.params;
    const { classes } = this.props;
    return (
      <Query query={CONTENT_QUERY} variables={{ id }} fetchPolicy="no-cache">
        {({ loading, error, data, refetch }) => {
          if (loading) return <CircularProgress color="secondary" />;
          if (error) return `Error! ${error.message}`;
          let mainComment = data.getComment.content;
          let responseList = data.getComment.responses;
          return (
            <div className={style.allRoot}>
              <Paper className={style.pageRoot}>
                <UserAvatar author={data.getComment.author} />
                <h3>課程學期 :</h3> <h2>{data.getComment.semester}</h2>
                <h3>課程名稱 : </h3>
                <h2>{data.getComment.name}</h2>
                <h3>開課教授 : </h3>
                <h2>{data.getComment.teacher}</h2>
                {data.getComment.studyTogether && (
                  <>
                    <h3>推薦一起修的課程 : </h3>
                    <h2>{data.getComment.studyTogether}</h2>
                  </>
                )}
                {data.getComment.studyBefore && (
                  <>
                    <h3>推薦預先修的課程 : </h3>
                    <h2>{data.getComment.studyBefore}</h2>
                  </>
                )}
                <h3>課程評價 : </h3>
                <p style={{ whiteSpace: 'pre-line' }}>{mainComment}</p>
              </Paper>

              {responseList.map((response, index) => (
                <Paper className={style.pageRoot} key={index}>
                  <UserAvatar author={response.author} />
                  <h5>{index + 1 + '樓'}</h5>
                  <h3>課程評價回應 : </h3>
                  <p style={{ whiteSpace: 'pre-line' }}>{response.content}</p>
                </Paper>
              ))}
              <Mutation mutation={RESPONSE_MUTATION} onCompleted={refetch}>
                {(submit, { returnData }) => {
                  return (
                    <form
                      onSubmit={e => {
                        e.preventDefault();
                        let temp = this.state.content;
                        this.setState({ content: '' });
                        submit({
                          variables: {
                            author: JSON.parse(
                              atob(this.props.token.split('.')[1])
                            ).id,
                            content: temp,
                            comment_id: data.getComment._id
                          }
                        });
                      }}
                    >
                      <Paper className={style.pageRootSubmit}>
                        <UserAvatar query={true} />
                        <TextField
                          id="content"
                          fullWidth={true}
                          label="評價回應"
                          className={classes.textFieldComment}
                          multiline
                          rows="10"
                          onChange={this.handleChange('content')}
                          margin="normal"
                          value={this.state.content}
                          variant="outlined"
                        />
                        <div className={style.buttonContainer}>
                          <Button
                            variant="outlined"
                            color="primary"
                            className={classes.button}
                            onClick={e => {
                              e.preventDefault();
                              refetch();
                            }}
                          >
                            重新整理
                          </Button>
                          <Button
                            variant="outlined"
                            color="primary"
                            className={classes.button}
                            type="submit"
                            onClick={this.handleResponseSubmit}
                          >
                            確認送出
                          </Button>
                        </div>
                      </Paper>
                    </form>
                  );
                }}
              </Mutation>
            </div>
          );
        }}
      </Query>
    );
  }
}

const connectedCommentPage = connect(
  mapStateToProps,
  undefined
)(CommentPage);

export default withStyles(styles)(connectedCommentPage);
