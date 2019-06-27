import React, { Component } from 'react';
import gql from 'graphql-tag';
import style from './CommentPage.module.css';
import { Query } from 'react-apollo';
import { Paper } from '@material-ui/core';
const CONTENT_QUERY = gql`
  query($id: String) {
    getComment(_id: $id) {
      semester
      name
      _id
      type
      domain
      teacher
      studyTogether
      studyBefore
      content
      score
      author
    }
  }
`;
class CommentPage extends Component {
  render() {
    const { id } = this.props.match.params;
    console.log(id);
    return (
      <>
        <Query query={CONTENT_QUERY} variables={{ id }}>
          {({ loading, error, data }) => {
            if (loading) return '等一下啦 > <';
            if (error) return `Error! ${error.message}`;
            let mainComment = data.getComment.content[0];
            let responseList = data.getComment.content.filter(
              (_, index) => index !== 0
            );
            return (
              <>
                <div className={style.allRoot}>
                  <Paper className={style.pageRoot}>
                    <h3>課程學期 :</h3> <h2>{data.getComment.semester}</h2>
                    <h3>課程名稱 : </h3>
                    <h2>{data.getComment.name}</h2>
                    <h3>開課教授 : </h3>
                    <h2>{data.getComment.teacher}</h2>
                    {data.getComment.studyTogether ? (
                      <>
                        <h3>推薦一起修的課程 : </h3>
                        <h2>{data.getComment.studyTogether}</h2>
                      </>
                    ) : null}
                    {data.getComment.studyBefore ? (
                      <>
                        <h3>推薦預先修的課程 : </h3>
                        <h2>{data.getComment.studyBefore}</h2>
                      </>
                    ) : null}
                    <h3>課程評價 : </h3>
                    <p>{mainComment}</p>
                  </Paper>

                  {responseList.map(response => (
                    <Paper className={style.pageRoot}>
                      <h3>課程評價回應 : </h3>
                      <p>{response}</p>
                    </Paper>
                  ))}
                </div>
              </>
            );
          }}
        </Query>
      </>
    );
  }
}
export default CommentPage;
