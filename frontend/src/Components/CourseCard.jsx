import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { getSemester } from '../util';

const semester = getSemester();
const styles = {
  card: {
    margin: '1rem 1.2rem',
    width: '500px'
  },
  actionArea: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'flex-start',
    height: '100%',
    textAlign: 'left'
  },
  media: {
    width: '100%'
  },
  title: {
    fontSize: '0.9rem'
  },
  unstyledLink: {
    textDecoration: 'inherit',
    color: 'inherit'
  }
};

function CourseCard(props) {
  const {
    classes,
    name,
    image = 'http://global.oup.com/us/companion.websites/fdscontent/uscompanion/us/images/9780199339136/cover.jpg',
    priority,
    student_ids,
    url
  } = props;
  return (
    <Card className={classes.card}>
      <Link to={url || ''} className={classes.unstyledLink}>
        <CardActionArea className={classes.actionArea}>
          <div style={{ height: '100%' }}>
            <CardMedia
              className={classes.media}
              image={image}
              title={name}
              component="img"
            />
          </div>
          <CardContent style={{ marginLeft: '12px' }}>
            <Typography className={classes.title} color="textSecondary">
              {semester}
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              style={{ whiteSpace: 'nowrap' }}
            >
              {name}
            </Typography>
            {priority &&
              priority.length > 1 &&
              priority.map((i, index) => (
                <Typography
                  component="p"
                  style={{ fontSize: '1rem' }}
                  key={i}
                >{`${index + 1}. ${i}`}</Typography>
              ))}
            {priority && priority.length <= 1 && (
              <>
                {priority[0] && (
                  <Typography component="p" style={{ fontSize: '1rem' }}>
                    {priority[0]}
                  </Typography>
                )}
                {student_ids &&
                  student_ids.map(i => (
                    <Typography
                      component="p"
                      style={{ fontSize: '1rem' }}
                      key={i}
                    >
                      {i}
                    </Typography>
                  ))}
              </>
            )}
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
}

CourseCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CourseCard);
