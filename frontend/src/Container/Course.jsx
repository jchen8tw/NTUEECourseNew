import React from 'react';
import { connect } from 'react-redux';
import { Paper, Typography, LinearProgress } from '@material-ui/core';
import { Mutation } from 'react-apollo';
import SotableList from '../Components/SortableList';
import { UPDATE_WISH } from '../graphql/mutation';
import { send_success, update_wishes } from '../redux/actions';

const mapStateToProps = state => ({
  getSelected: name =>
    (state.wishes && state.wishes.find(i => i.name === name)) || []
});

const mapDispatchToProps = dispatch => ({
  sendSuccess: data => dispatch(send_success(data)),
  updateWish: data => dispatch(update_wishes(data))
});

const Course = props => {
  const { match, courses, name, sendSuccess, updateWish } = props;
  //need to add a dummy list item to default not selecting any course
  let selected = [],
    notSelected = [];
  let priority = props.getSelected(name).priority;
  courses.forEach(course => {
    let res = { id: course._id, text: course.teacher };
    if (priority && priority.indexOf(course.teacher) !== -1)
      // in wishes, i.e. selected
      selected.push(res);
    else notSelected.push(res);
  });
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
        style={{
          margin: 'auto',
          minWidth: '80%',
          display: 'table'
        }}
      >
        <Mutation
          mutation={UPDATE_WISH}
          onCompleted={data =>
            data.wish.name &&
            sendSuccess(`已更新「${data.wish.name}」的志願序`) &&
            updateWish(data.wish)
          }
        >
          {(updateWish, result) => {
            if (result.loading) return <LinearProgress color="secondary" />;
            else if (result.error) return <p>{result.error.message}</p>;
            else
              return (
                <SotableList {...{ selected, notSelected, name, updateWish }} />
              );
          }}
        </Mutation>
      </Paper>
    </>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Course);
