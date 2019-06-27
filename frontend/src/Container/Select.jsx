import React from 'react';
import { Card, Typography, CardActionArea,LinearProgress } from '@material-ui/core';
import { Query } from 'react-apollo';
import classNames from 'classnames';
import BreadCrumbs from '../Components/Breadcrumbs';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { get_course_info,logout } from '../redux/actions';
import CourseCategory from './CourseCategory';
import style from './Select.module.css';
import COURSE_QUERY from '../graphql/coursequery';

let categories = ['大一', '大二', '大三\n大四', '十選二實驗'];
const mapDispatchToProps = dispatch => {
  return {
    getCourse: data => dispatch(get_course_info(data)),
    logout: () => dispatch(logout())
  };
};
function Select(props) {
  const allUrl = categories.map(name => `${props.match.path}/${name}`);
  let child = null;
  if (!props.match.isExact)
    child = allUrl.map((url,grademinusone) => (
      <Route key={url} path={url} component={props => <CourseCategory {...props} grade={grademinusone+1}/>} />
    ));
  else
    child = categories.map((name, index) => (
      <Card className={style.category} key={`select-category-${index}`}>
        <Link to={allUrl[index]} style={{ textDecoration: 'none' }}>
          <CardActionArea style={{ height: '100%' }}>
            <Typography
              variant="h3"
              style={{ whiteSpace: 'pre', lineHeight: '1.5' }}
            >
              {name}
            </Typography>
          </CardActionArea>
        </Link>
      </Card>
    ));
  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'column nowrap',
        backgroundColor: '#fafafa'
      }}
    >
      <Query
        query={COURSE_QUERY}
        skip={!!props.courses}
        onCompleted={data => props.getCourse(data)}
      >
        {({ loading, error, data }) => {
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
          } else if (!loading && !error) {
            return null;
          }
        }}
      </Query>
      <BreadCrumbs url={props.location.pathname} />{' '}
      {props.match.isExact ? <div className={style.grid}>{child}</div> : child}
    </div>
  );
}
const connectedSelect = connect(
  null,
  mapDispatchToProps
)(Select);
export default connectedSelect;
