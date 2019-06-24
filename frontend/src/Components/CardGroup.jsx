import React from 'react';
import CourseCard from './CourseCard';

function CardGroup(props) {
  return (
    <div
      style={{
        width: '100%',
        flexFlow: 'row wrap',
        display: 'flex',
        justifyContent: 'space-evenly'
      }}
    >
      {props.data.map(i => (
        <CourseCard key={i._id} {...i} />
      ))}
    </div>
  );
}

export default CardGroup;
