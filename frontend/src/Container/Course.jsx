import React from 'react';
import { connect } from 'react-redux';
import { Paper, Typography, LinearProgress } from '@material-ui/core';
import { Mutation } from 'react-apollo';
import SotableList from '../Components/SortableList';
import { UPDATE_WISH } from '../graphql/mutation';
import { send_success } from '../redux/actions';

const mapDispatchToProps = dispatch => ({
  sendSuccess: data => dispatch(send_success(data))
});

const Course = props => {
  const { match, courses, name, sendSuccess } = props;
  let data = courses.map((course, id) => ({ id: id, text: course.teacher }));
  return (
    <>
      <Typography
        variant="h3"
        style={{ textAlign: 'left', paddingLeft: '2rem' }}
      >
        {match.path.split('/').pop()}
      </Typography>
      <Paper
        square
        style={{ margin: '0 auto', minWidth: '80%', marginTop: '10%' }}
      >
        <Mutation
          mutation={UPDATE_WISH}
          onCompleted={data =>
            data.course_name &&
            sendSuccess(`已更新「${data.course_name}」的志願序`)
          }
        >
          {(updateWish, result) => {
            if (result.loading) return <LinearProgress color="secondary" />;
            else if (result.error) return <p>{result.error.message}</p>;
            else return <SotableList {...{ data, name, updateWish }} />;
          }}
        </Mutation>
      </Paper>
    </>
  );
};

export default connect(
  undefined,
  mapDispatchToProps
)(Course);
