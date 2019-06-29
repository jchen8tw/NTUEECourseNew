import React from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@material-ui/core';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import DragHandleIcon from '@material-ui/icons/DragHandle';

const applyDrag = (arr, dragResult) => {
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) return arr;

  const result = [...arr];
  let itemToAdd = payload;

  if (removedIndex !== null) itemToAdd = result.splice(removedIndex, 1)[0];
  if (addedIndex !== null) result.splice(addedIndex, 0, itemToAdd);

  return result;
};

const style = theme => ({
  drag: {
    opacity: '1',
    backgroundColor: theme.palette.action.hover,
    boxShadow: theme.shadows[4],
    '& div::before': {
      display: 'none'
    }
  },
  child: {
    opacity: '1',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.background.paper
  },
  list: {
    counterReset: 'teacher',
    padding: '2%'
  },
  text: {
    '& > *': {
      fontSize: '1.7rem',
      display: 'inline-block'
    }
  },
  orderedText: {
    '&::before': {
      counterIncrement: 'teacher',
      content: 'counter(teacher) "."',
      marginRight: theme.spacing.unit,
      fontSize: '1.7rem'
    }
  }
});

class SortableList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: props.selected, notSelected: props.notSelected };
  }

  componentWillUnmount() {
    this.props.updateWish({
      variables: {
        course_name: this.props.name,
        priority: this.state.selected.map(i => i.text)
      }
    });
  }

  onSelectedDrop = e =>
    this.setState({ selected: applyDrag(this.state.selected, e) });
  onNotSelectedDrop = e =>
    this.setState({ notSelected: applyDrag(this.state.notSelected, e) });

  render() {
    const { classes } = this.props;
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <List className={classes.list}>
          <Typography variant="h4" align="left">
            已加入志願序
          </Typography>
          <Container
            groupName="1"
            getChildPayload={i => this.state.selected[i]}
            onDrop={this.onSelectedDrop}
            dragClass={classes.drag}
          >
            {this.state.selected.map(({ id, text }) => (
              <Draggable key={id}>
                <ListItem button TouchRippleProps={{ child: classes.child }}>
                  <ListItemText
                    primary={text}
                    className={classNames(classes.text, classes.orderedText)}
                  />
                  <ListItemIcon>
                    <DragHandleIcon fontSize="large" />
                  </ListItemIcon>
                </ListItem>
              </Draggable>
            ))}
          </Container>
        </List>
        <Divider />
        <List className={classes.list}>
          <Typography variant="h4" align="left">
            未加入志願序
          </Typography>
          <Container
            groupName="1"
            getChildPayload={i => this.state.notSelected[i]}
            onDrop={this.onNotSelectedDrop}
            dragClass={classes.drag}
          >
            {this.state.notSelected.map(({ id, text }) => (
              <Draggable key={id}>
                <ListItem button TouchRippleProps={{ child: classes.child }}>
                  <ListItemText primary={text} className={classes.text} />
                  <ListItemIcon>
                    <DragHandleIcon fontSize="large" />
                  </ListItemIcon>
                </ListItem>
              </Draggable>
            ))}
          </Container>
        </List>
      </div>
    );
  }
}

export default withStyles(style)(SortableList);
