import React from 'react';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { Typography, Divider, LinearProgress } from '@material-ui/core';
import { get_course_info } from '../redux/actions';
import CardGroup from '../Components/CardGroup';
import style from './Dashboard.module.css';

const data = [
  {
    _id: '1',
    image:
      'http://global.oup.com/us/companion.websites/fdscontent/uscompanion/us/images/9780199339136/cover.jpg',
    name: '108-1 電子學一',
    choices: ['呂帥', '呂漂亮', '呂醜']
  },
  {
    _id: '2',
    image:
      'http://global.oup.com/us/companion.websites/fdscontent/uscompanion/us/images/9780199339136/cover.jpg',
    name: '108-1 電路學',
    choices: ['呂帥', '呂漂亮', '呂醜']
  }
];

const COURSE_QUERY = gql`
  query {
    allCourseGroups {
      _id
      name
      grade
      courses {
        _id
        teacher
      }
    }
  }
`;

const mapDispatchToProps = dispatch => {
  return { getCourse: data => dispatch(get_course_info(data)) };
};
const mapStateToProps = state => {
  return { courses: state.courses };
};

function Dashboard(props) {
  return (
    <div className={style.container}>
      <Query
        query={COURSE_QUERY}
        skip={!!props.courses}
        onCompleted={data => props.getCourse(data)}
      >
        {({ loading, error, data }) => {
          if (loading) {
            return <LinearProgress color="secondary" />;
          } else if (!!error) {
            return <p>{error.message}</p>;
          } else if (!loading && !error) {
            return null;
          }
        }}
      </Query>
      <section>
        <div className={style.headingWrapper}>
          <Typography align="left" variant="h3" component="h3">
            您已經選的課程
          </Typography>
        </div>
        <CardGroup data={data} />
      </section>
      <Divider />
      <section>
        <div className={style.headingWrapper}>
          <Typography align="left" variant="h3" component="h3">
            您尚未選的課程
          </Typography>
        </div>
        <CardGroup data={data} />
      </section>
    </div>
  );
}
const connectedDashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
export default connectedDashboard;
