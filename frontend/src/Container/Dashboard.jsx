import React from 'react';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import COURSE_QUERY from '../graphql/query';
import { Typography, Divider, LinearProgress } from '@material-ui/core';
import { get_course_info, logout } from '../redux/actions';
import CardGroup from '../Components/CardGroup';
import style from './Dashboard.module.css';

const dumdata = [
  {
    _id: '1',
    image:
      'http://global.oup.com/us/companion.websites/fdscontent/uscompanion/us/images/9780199339136/cover.jpg',
    year: '108-1',
    name: '電子學一',
    choices: ['呂帥', '呂漂亮', '呂醜']
  },
  {
    _id: '2',
    image:
      'http://global.oup.com/us/companion.websites/fdscontent/uscompanion/us/images/9780199339136/cover.jpg',
    year: '108-1',
    name: '電工實驗(網路與多媒體)',
    choices: ['呂帥', '呂漂亮', '呂醜']
  },
  {
    _id: '3',
    image:
      'http://global.oup.com/us/companion.websites/fdscontent/uscompanion/us/images/9780199339136/cover.jpg',
    year: '108-1',
    name: '交換電路與邏輯設計',
    choices: ['呂帥', '呂漂亮', '呂醜']
  },
  {
    _id: '4',
    image:
      'http://global.oup.com/us/companion.websites/fdscontent/uscompanion/us/images/9780199339136/cover.jpg',
    year: '108-1',
    name: '交換電路與邏輯設計',
    choices: ['呂帥', '呂漂亮', '呂醜']
  },
  {
    _id: '5',
    image:
      'http://global.oup.com/us/companion.websites/fdscontent/uscompanion/us/images/9780199339136/cover.jpg',
    year: '108-1',
    name: '交換電路與邏輯設計',
    choices: ['呂帥', '呂漂亮', '呂醜', '呂漂亮', '呂醜']
  }
];

const dumdata2 = [
  {
    _id: '3',
    image:
      'http://global.oup.com/us/companion.websites/fdscontent/uscompanion/us/images/9780199339136/cover.jpg',
    year: '108-1',
    name: '線性代數',
    choices: null
  },
  {
    _id: '4',
    image:
      'http://global.oup.com/us/companion.websites/fdscontent/uscompanion/us/images/9780199339136/cover.jpg',
    year: '108-1',
    name: '微分方程',
    choices: null
  }
];

const mapDispatchToProps = dispatch => {
  return {
    getCourse: data => dispatch(get_course_info(data)),
    logout: () => dispatch(logout())
  };
};
const mapStateToProps = state => {
  return { courses: state.courses };
};

function Dashboard(props) {
  return (
    <div className={style.container}>
      <Query
        query={COURSE_QUERY}
        skip={!!props.courses}
        onCompleted={data => props.getCourse(data)}
      >
        {({ loading, error, data }) => {
          if (loading) {
            return (
              <LinearProgress
                color="secondary"
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  height: 3,
                  width: '100vw'
                }}
              />
            );
          } else if (!!error) {
            props.logout();
            return <p>{error.message}</p>;
          } else if (!loading && !error) {
            return (
              <>
                <section>
                  <div className={style.headingWrapper}>
                    <Typography align="left" variant="h4" component="h3">
                      您已經選的課程
                    </Typography>
                  </div>
                  <CardGroup data={dumdata} />
                </section>
                <Divider />
                <section>
                  <div className={style.headingWrapper}>
                    <Typography align="left" variant="h4" component="h3">
                      您尚未選的課程
                    </Typography>
                  </div>
                  <CardGroup data={dumdata2} />
                </section>
              </>
            );
          }
        }}
      </Query>
    </div>
  );
}
const connectedDashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
export default connectedDashboard;
