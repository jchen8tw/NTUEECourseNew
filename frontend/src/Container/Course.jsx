import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import SotableList from '../Components/SortableList';

export default props => {
  const { match, teachers } = props;
  let data = teachers.map((teacher, id) => ({ id: id, text: teacher.teacher }));
  return (
    <>
      <Typography
        variant="h3"
        style={{ textAlign: 'left', paddingLeft: '2rem' }}
      >
        {match.path.split('/').pop()}
      </Typography>
      <Paper
        square
        style={{ margin: '0 auto', minWidth: '80%', marginTop: '10%' }}
      >
        <SotableList data={data} />
      </Paper>
    </>
  );
};
