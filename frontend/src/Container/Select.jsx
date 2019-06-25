import React from 'react';
import { Card, Typography, CardActionArea } from '@material-ui/core';

let categories = ['大一', '大二', '大三\n大四', '十選二實驗'];

function Select(props) {
  return (
    <div
      style={{
        margin: '5% 10%',
        display: 'grid',
        gridAutoColumns: '250px'
      }}
    >
      {categories.map((name, index) => (
        <Card
          key={`select-category-${index}`}
          style={{
            textAlign: 'center',
            width: '250px',
            height: '250px'
          }}
        >
          <CardActionArea style={{ height: '100%' }}>
            <Typography
              variant="h3"
              style={{ whiteSpace: 'pre', lineHeight: '1.5' }}
            >
              {name}
            </Typography>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
}
export default Select;
