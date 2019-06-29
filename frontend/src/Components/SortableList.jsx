import React, { useState } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction
} from '@material-ui/core';
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
    counterReset: 'teacher'
  },
  text: {
    '& > *': {
      fontSize: '1.8rem',
      display: 'inline-block'
    },
    '&::before': {
      counterIncrement: 'teacher',
      content: 'counter(teacher) "."',
      marginRight: theme.spacing.unit,
      fontSize: '1.8rem'
    }
  }
});

const SortableList = ({ data, classes }) => {
  const [items, setItems] = useState(data);

  const onDrop = e => setItems(applyDrag(items, e));

  return (
    <List className={classes.list}>
      <Container
        lockAxis="y"
        onDrop={onDrop}
        dragClass={classes.drag}
        behaviour="contain"
      >
        {items.map(({ id, text }) => (
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
  );
};

export default withStyles(style)(SortableList);
