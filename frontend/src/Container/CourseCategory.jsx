import React from 'react';
import { Route } from 'react-router-dom';
import CourseCard from '../Components/CourseCard';

import style from './CourseCategory.module.css';

const data = [
  {
    _id: '3',
    image:
      'http://global.oup.com/us/companion.websites/fdscontent/uscompanion/us/images/9780199339136/cover.jpg',
    year: '108-1',
    name: '線性代數',
    choices: null
  },
  {
    _id: '4',
    image:
      'http://global.oup.com/us/companion.websites/fdscontent/uscompanion/us/images/9780199339136/cover.jpg',
    year: '108-1',
    name: '微分方程',
    choices: null
  },
  {
    _id: '5',
    image:
      'http://global.oup.com/us/companion.websites/fdscontent/uscompanion/us/images/9780199339136/cover.jpg',
    year: '108-1',
    name: '信號與系統',
    choices: null
  }
];

function CourseCategory(props) {
  return (
    <div className={style.grid}>
      {data.map(course => {
        let url = `${props.location.pathname}/${course.name}`;
        return (
          <div key={course.name}>
            <CourseCard key={course.name} {...course} />
            <Route
              path={url}
              render={props => (
                <p>{`${props.match.url}, ${url}, ${course.name}`}</p>
              )}
            />
          </div>
        );
      })}
    </div>
  );
}

export default CourseCategory;
