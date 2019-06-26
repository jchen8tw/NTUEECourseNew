import React from 'react';
import { Card, Typography, CardActionArea } from '@material-ui/core';
import BreadCrumbs from '../Components/Breadcrumbs';
import { Link, Route } from 'react-router-dom';

import style from './Select.module.css';
import { copyFileSync } from 'fs';
let categories = ['大一', '大二', '大三\n大四', '十選二實驗'];

function Select(props) {
  console.log(props);
  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'column nowrap',
        backgroundColor: '#fafafa'
      }}
    >
      <BreadCrumbs />
      <div className={style.grid}>
        {categories.map((name, index) => {
          let url = `${props.match.url}/${name}`;
          return (
            <>
              {props.match.isExact && (
                <Card
                  key={`select-category-${index}`}
                  className={style.category}
                >
                  <Link to={url} style={{ textDecoration: 'none' }}>
                    <CardActionArea style={{ height: '100%' }}>
                      <Typography
                        variant="h3"
                        style={{ whiteSpace: 'pre', lineHeight: '1.5' }}
                      >
                        {name}
                      </Typography>
                    </CardActionArea>
                  </Link>
                </Card>
              )}
              <Route
                path={url}
                render={props => <p>{`${props.match.url}, ${url}`}</p>}
              />
            </>
          );
        })}
      </div>
    </div>
  );
}
export default Select;
