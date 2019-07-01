import React from 'react';
import { connect } from 'react-redux';
import {
  Paper,
  TextField,
  Typography,
  LinearProgress
} from '@material-ui/core';
import { Mutation } from 'react-apollo';
import { getStudentID } from '../util';
import { UPDATE_WISH_WITH_TEAMMATE } from '../graphql/mutation';
import {
  send_success,
  send_error,
  update_wishes_with_teammate
} from '../redux/actions';

const mapStateToProps = state => ({
  token: state.jwt,
  getWish: name =>
    (state.wishes && state.wishes.find(i => i.name === name)) || []
});
const mapDispatchToProps = dispatch => ({
  sendSuccess: data => dispatch(send_success(data)),
  sendError: data => dispatch(send_error(data)),
  updateWishesWithTeammate: data => dispatch(update_wishes_with_teammate(data))
});

class TeammateInput extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.studentIDs) {
      let arr = [...this.props.studentIDs];
      let ind = arr.indexOf(this.props.studentID);
      if (ind !== -1) arr.splice(ind, 1);
      this.state = { student_ids: [this.props.studentID, ...arr, ''] };
    } else {
      this.state = { student_ids: [this.props.studentID, ''] };
    }
  }

  componentWillUnmount() {
    let arr = [...this.state.student_ids];
    arr.splice(-1, 1); // remove empty string at the end
    this.props.updateWishWithTeammate({
      variables: {
        student_ids: arr,
        course_name: this.props.name,
        priority: this.props.courses[0].teacher
      }
    });
  }

  handleChange = index => event => {
    let arr = [...this.state.student_ids];
    if (
      index === this.state.student_ids.length - 1 &&
      event.target.value &&
      this.state.student_ids[index] === ''
    ) {
      // is the last thing and changed from empty string
      arr[index] = event.target.value;
      arr.push('');
    } else if (event.target.value === '') {
      // change to empty string
      arr.splice(index, 1);
    } else {
      arr[index] = event.target.value;
    }
    this.setState({ student_ids: arr });
  };

  render() {
    return (
      <Paper style={{ display: 'table', margin: '0 auto', padding: '1%' }}>
        <Typography variant="h4" align="left">
          組員名單
        </Typography>
        <TextField
          value={this.state.student_ids[0]}
          onChange={this.handleChange(0)}
          label={`你自己的學號(不選請留白)`}
          style={{ display: 'block' }}
        />
        {this.state.student_ids.map(
          (i, index) =>
            index > 0 && (
              <TextField
                key={`teammate-${index}`}
                value={i}
                label={`組員${index}`}
                placeholder="請輸入組員學號"
                onChange={this.handleChange(index)}
                style={{ display: 'block' }}
              />
            )
        )}
      </Paper>
    );
  }
}

class CourseWithTeammate extends React.Component {
  render() {
    return (
      <>
        <Typography
          variant="h3"
          style={{ textAlign: 'left', paddingLeft: '2rem' }}
        >
          {this.props.match.path.split('/').pop()}
          <Mutation
            mutation={UPDATE_WISH_WITH_TEAMMATE}
            onCompleted={data =>
              data.wish.name &&
              this.props.sendSuccess(
                `已更新「${data.wish.name}」的志願序與組員名單`
              ) &&
              this.props.updateWishesWithTeammate(data.wish)
            }
            onError={error => this.props.sendError(error.message)}
          >
            {(updateWishWithTeammate, result) => {
              if (result.loading) return <LinearProgress color="secondary" />;
              else if (result.error) return null;
              else
                return (
                  <TeammateInput
                    name={this.props.name}
                    studentID={getStudentID(this.props.token)}
                    studentIDs={this.props.getWish(this.props.name).student_ids}
                    courses={this.props.courses}
                    updateWishWithTeammate={updateWishWithTeammate}
                  />
                );
            }}
          </Mutation>
        </Typography>
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseWithTeammate);
