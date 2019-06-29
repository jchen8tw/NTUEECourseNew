import React from 'react';
import { Route } from 'react-router-dom';
import Course from '../Container/Course';
import CourseCard from '../Components/CourseCard';
import { connect } from 'react-redux';

import style from './CourseCategory.module.css';

const mapStateToProps = state => {
  return { courses: state.courses };
};

function CourseCategory(props) {
  const courseGroup = props.courses.filter(
    course => course.grade === props.grade
  );
  const courseByGrade = courseGroup.map(course => ({
    ...course,
    image:
      'http://global.oup.com/us/companion.websites/fdscontent/uscompanion/us/images/9780199339136/cover.jpg'
  }));
  const allUrl = courseGroup.map(
    course => `${props.match.path}/${course.name.replace(/[()]/g, '')}`
  );
  if (!props.match.isExact)
    return (
      <React.Fragment>
        {allUrl.map((url, id) => (
          <Route
            key={url}
            path={url}
            component={props => (
              <Course {...props} teachers={courseGroup[id].courses} />
            )}
          />
        ))}
      </React.Fragment>
    );
  else {
    //need to reder courses depends on grade
    return (
      <div className={style.grid}>
        {courseByGrade.map((course, index) => (
          <CourseCard key={course.name} url={allUrl[index]} {...course} />
        ))}
      </div>
    );
  }
}
const connectedCourseCategory = connect(mapStateToProps)(CourseCategory);
export default connectedCourseCategory;
