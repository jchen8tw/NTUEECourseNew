import React from 'react';
import { Card, Typography, CardActionArea } from '@material-ui/core';

import style from './Select.module.css';
let categories = ['大一', '大二', '大三\n大四', '十選二實驗'];

function Select(props) {
  return (
    <div style={{ display: 'flex' }}>
      <div className={style.grid}>
        {categories.map((name, index) => (
          <Card key={`select-category-${index}`} className={style.category}>
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
    </div>
  );
}
export default Select;
