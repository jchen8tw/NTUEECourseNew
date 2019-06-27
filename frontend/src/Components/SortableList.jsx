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
    boxShadow: theme.shadows[4]
  },
  child: {
    backgroundColor: theme.palette.background.paper
  }
});

const SortableList = ({ classes }) => {
  const [items, setItems] = useState([
    { id: '1', text: 'Item 1' },
    { id: '2', text: 'Item 2' },
    { id: '3', text: 'Item 3' },
    { id: '4', text: 'Item 4' }
  ]);

  const onDrop = e => setItems(applyDrag(items, e));

  return (
    <List>
      <Container lockAxis="y" onDrop={onDrop} dragClass={classes.drag}>
        {items.map(({ id, text }) => (
          <Draggable key={id}>
            <ListItem button TouchRippleProps={{ classes }}>
              <ListItemText primary={text} />
              {/* <ListItemSecondaryAction> */}
              <ListItemIcon className="drag-handle">
                <DragHandleIcon />
              </ListItemIcon>
              {/* </ListItemSecondaryAction> */}
            </ListItem>
          </Draggable>
        ))}
      </Container>
    </List>
  );
};

export default withStyles(style)(SortableList);
