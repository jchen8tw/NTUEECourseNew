import React from 'react';
import { Typography } from '@material-ui/core';
import SotableList from '../Components/SortableList';
/*
let data = [
  { id: '1', text: '林茂昭' },
  { id: '2', text: '蘇柏青' },
  { id: '3', text: '李宏毅' },
  { id: '4', text: '劉志文' }
];
*/
export default (props) => {
  //console.log(props);
  const { match ,teachers} = props
  let data = teachers.map((teacher,id) => ({id: id,text: teacher.teacher}));
  return (
    <>
      <Typography
        variant="h3"
        style={{ textAlign: 'left', paddingLeft: '2rem' }}
      >
        {match.path.split('/').pop()}
      </Typography>
      <SotableList data={data} />
    </>
  );
};
