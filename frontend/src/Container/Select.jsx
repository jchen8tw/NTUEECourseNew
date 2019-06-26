import React from 'react';
import { Card, Typography, CardActionArea } from '@material-ui/core';
import classNames from 'classnames';
import BreadCrumbs from '../Components/Breadcrumbs';
import { Link, Route } from 'react-router-dom';

import CourseCategory from './CourseCategory';
import style from './Select.module.css';

let categories = ['大一', '大二', '大三\n大四', '十選二實驗'];

function Select(props) {
  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'column nowrap',
        backgroundColor: '#fafafa'
      }}
    >
      <BreadCrumbs url={props.location.pathname.replace('/select', '')} />
      <div className={classNames({ [style.grid]: props.match.isExact })}>
        {categories.map((name, index) => {
          let url = `${props.match.url}/${name}`;
          return (
            <div key={`select-category-${index}`}>
              {props.match.isExact && (
                <Card className={style.category}>
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
                render={props => <CourseCategory {...props} />}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Select;
