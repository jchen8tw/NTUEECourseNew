import React from 'react';
import CardGroup from '../Components/CardGroup';
import { Typography, Divider } from '@material-ui/core';

import style from './Dashboard.module.css';

const data = [
  {
    _id: '1',
    image:
      'http://global.oup.com/us/companion.websites/fdscontent/uscompanion/us/images/9780199339136/cover.jpg',
    name: '108-1 電子學一',
    choices: ['呂帥', '呂漂亮', '呂醜']
  },
  {
    _id: '2',
    image:
      'http://global.oup.com/us/companion.websites/fdscontent/uscompanion/us/images/9780199339136/cover.jpg',
    name: '108-1 電路學',
    choices: ['呂帥', '呂漂亮', '呂醜']
  }
];

function Dashboard(props) {
  return (
    <div className={style.container}>
      <section>
        <div className={style.headingWrapper}>
          <Typography align="left" variant="h3" component="h3">
            您已經選的課程
          </Typography>
        </div>
        <CardGroup data={data} />
      </section>
      <Divider />
      <section>
        <div className={style.headingWrapper}>
          <Typography align="left" variant="h3" component="h3">
            您尚未選的課程
          </Typography>
        </div>
        <CardGroup data={data} />
      </section>
    </div>
  );
}

export default Dashboard;
