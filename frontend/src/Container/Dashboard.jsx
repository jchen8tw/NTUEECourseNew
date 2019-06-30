import React, { useEffect } from 'react';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import { WISHES_AND_COURSE_QUERY } from '../graphql/query';
import { Typography, Divider, LinearProgress } from '@material-ui/core';
import {
  get_course_info,
  get_wishes,
  logout,
  handleTabChange
} from '../redux/actions';
import CardGroup from '../Components/CardGroup';
import style from './Dashboard.module.css';

const mapDispatchToProps = dispatch => {
  return {
    getCourse: data => dispatch(get_course_info(data)),
    getWishes: data => dispatch(get_wishes(data)),
    logout: () => dispatch(logout()),
    handleTabChange: () => dispatch(handleTabChange(0))
  };
};
const mapStateToProps = state => {
  return {
    courses: state.courses,
    wishes: state.wishes,
    unselected: state.unselected
  };
};

function Dashboard(props) {
  useEffect(() => {
    props.handleTabChange();
  });
  return (
    <div className={style.container}>
      <Query
        query={WISHES_AND_COURSE_QUERY}
        skip={!!props.courses}
        onCompleted={data =>
          props.getCourse(data.allCourseGroups) &&
          props.getWishes(data.allWishes)
        }
        fetchPolicy="no-cache"
      >
        {({ loading, error }) => {
          if (loading) {
            return (
              <LinearProgress
                color="secondary"
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  height: 3,
                  width: '100vw'
                }}
              />
            );
          } else if (!!error) {
            props.logout();
            return <p>{error.message}</p>;
          } else {
            return (
              <>
                <section>
                  <div className={style.headingWrapper}>
                    <Typography align="left" variant="h4" component="h3">
                      您已經選的課程
                    </Typography>
                  </div>
                  <CardGroup data={props.wishes} />
                </section>
                <Divider />
                <section>
                  <div className={style.headingWrapper}>
                    <Typography align="left" variant="h4" component="h3">
                      您尚未選的課程
                    </Typography>
                  </div>
                  <CardGroup data={props.unselected} />
                </section>
              </>
            );
          }
        }}
      </Query>
    </div>
  );
}
const connectedDashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
export default connectedDashboard;
