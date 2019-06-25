import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
  }
};

function CourseCard(props) {
  const { classes, year, name, image, choices } = props;
  return (
    <Card className={classes.card}>
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
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {year}
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            style={{ whiteSpace: 'nowrap' }}
          >
            {name}
          </Typography>
          {choices &&
            choices.map((i, index) => (
              <Typography component="p" style={{ fontSize: '1rem' }}>{`${index +
                1}. ${i}`}</Typography>
            ))}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

CourseCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CourseCard);
