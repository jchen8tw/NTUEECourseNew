import React from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
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

class SortableList extends React.Component {
  constructor(props) {
    super(props);
    //console.log(props.data);
    this.state = { items: [{id:-1,text:'我不想選課啦(這欄以下的課不會被選)'},...props.data] };
  }

  componentWillUnmount() {
    this.props.updateWish({
      variables: {
        course_name: this.props.name,
        priority: this.state.items.map(i => i.text)
      }
    });
  }

  onDrop = e => this.setState({ items: applyDrag(this.state.items, e) });

  render() {
    const { classes } = this.props;
    return (
      <List className={classes.list}>
        <Container
          lockAxis="y"
          onDrop={this.onDrop}
          dragClass={classes.drag}
          behaviour="contain"
        >
          {this.state.items.map(({ id, text }) => (
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
  }
}

export default withStyles(style)(SortableList);
