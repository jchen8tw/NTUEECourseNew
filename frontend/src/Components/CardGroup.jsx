import React from 'react';
import CourseCard from './CourseCard';
import { CircularProgress } from '@material-ui/core';
import { courseToURL } from '../util';

function CardGroup(props) {
  if (!props.data) return <CircularProgress color="secondary" />;
  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'row wrap',
        boxSizing: 'border-box',
        width: '100%',
        padding: '0 20px'
      }}
    >
      {props.data.map(i => (
        <CourseCard key={i._id} url={courseToURL(i)} {...i} />
      ))}
    </div>
  );
}

export default CardGroup;
