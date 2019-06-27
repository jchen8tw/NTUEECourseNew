import React from 'react';
import { Card, Typography, CardActionArea } from '@material-ui/core';
import classNames from 'classnames';
import BreadCrumbs from '../Components/Breadcrumbs';
import { Link, Route } from 'react-router-dom';

import CourseCategory from './CourseCategory';
import style from './Select.module.css';

let categories = ['大一', '大二', '大三\n大四', '十選二實驗'];

function Select(props) {
  const allUrl = categories.map(name => `${props.match.path}/${name}`);
  let child = null;
  if (!props.match.isExact)
    child = allUrl.map(url => (
      <Route key={url} path={url} component={CourseCategory} />
    ));
  else
    child = categories.map((name, index) => (
      <Card className={style.category} key={`select-category-${index}`}>
        <Link to={allUrl[index]} style={{ textDecoration: 'none' }}>
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
    ));
  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'column nowrap',
        backgroundColor: '#fafafa'
      }}
    >
      <BreadCrumbs url={props.location.pathname} />{' '}
      {props.match.isExact ? <div className={style.grid}>{child}</div> : child}
    </div>
  );
}
export default Select;
