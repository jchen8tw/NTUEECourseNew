import React, { Component } from 'react';
import style from './CommentPage.module.css';
import { Query } from 'react-apollo';
import { Paper, CircularProgress } from '@material-ui/core';
import { CONTENT_QUERY } from '../graphql/query';
import UserAvatar from '../Components/Avatar';

class CommentPage extends Component {
  render() {
    const { id } = this.props.match.params;
    return (
      <Query query={CONTENT_QUERY} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) return <CircularProgress color="secondary" />;
          if (error) return `Error! ${error.message}`;
          let [mainComment, ...responseList] = data.getComment.content;
          return (
            <div className={style.allRoot}>
              <Paper className={style.pageRoot}>
                <UserAvatar />
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
                  <h3>課程評價回應 : </h3>
                  <p style={{ whiteSpace: 'pre-line' }}>{response}</p>
                </Paper>
              ))}
            </div>
          );
        }}
      </Query>
    );
  }
}
export default CommentPage;
