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
  const allUrl = data.map(course => `${props.match.path}/${course.name}`);
  console.log(props);
  if (!props.match.isExact)
    return (
      <>
        {allUrl.map(url => (
          <Route
            key={url}
            path={url}
            render={props => <p>{`${props.match.url}, ${url}`}</p>}
          />
        ))}
      </>
    );
  else
    return (
      <div className={style.grid}>
        {data.map((course, index) => (
          <CourseCard key={course.name} url={allUrl[index]} {...course} />
        ))}
      </div>
    );
}

export default CourseCategory;
