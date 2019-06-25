import React from 'react';
import CourseCard from './CourseCard';

function CardGroup(props) {
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
        <CourseCard key={i._id} {...i} />
      ))}
    </div>
  );
}

export default CardGroup;
