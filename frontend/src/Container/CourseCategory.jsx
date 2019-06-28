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
  const courses = props.courses.filter(course => course.grade === props.grade);
  const courseByGrade = courses.map(course => ({
    ...course,
    image:
      'http://global.oup.com/us/companion.websites/fdscontent/uscompanion/us/images/9780199339136/cover.jpg',
    year: '108-1'
  }));
  const allUrl = courses.map(course => `${props.match.path}/${course.name.replace(/\(/g,'').replace(/\)/g,'')}`);
  if (!props.match.isExact)
    return (
      <React.Fragment>
        {allUrl.map(url => (
          <Route key={url} path={url} component={Course} />
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
