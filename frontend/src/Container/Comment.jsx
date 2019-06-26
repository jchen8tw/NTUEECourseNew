import React, { Component } from 'react';
import style from './Comment.module.css';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 10 * 3 }}>
      {props.children}
    </Typography>
  );
}
const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
});
class CommentTab extends Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="全部顯示" />
            <Tab label="必修" />
            <Tab label="選修" />
            <Tab label="十選二" />
            <Tab label="專題" />
            <Tab label="發表評論" />
            <Tab label="文章管理" />
          </Tabs>
        </AppBar>
        <Switch>
          {value === 0 && (
            <TabContainer>
              <CommentList show="all" />
            </TabContainer>
          )}
          {value === 1 && (
            <TabContainer>
              <CommentList show="required" />
            </TabContainer>
          )}
          {value === 2 && (
            <TabContainer>
              <CommentList show="choose" />
            </TabContainer>
          )}
          {value === 3 && (
            <TabContainer>
              <CommentList show="tenTotwo" />
            </TabContainer>
          )}
          {value === 4 && (
            <TabContainer>
              <CommentList show="seminar" />
            </TabContainer>
          )}
          {value === 5 && <Route path="/publishComment" />}
          {value === 6 && <Route path="/manageComment" />}
        </Switch>
      </div>
    );
  }
}
const StyledCommentTab = withStyles(styles)(CommentTab);
class CommentList extends Component {
  handleSubmit = e => {
    e.preventDefault();
  };
  render() {
    return (
      <>
        <div className="container">
          <div className="row">
            <form onSubmit={this.handleSubmit}>
              <label for="title">課程搜尋</label>
              <input
                type="text"
                name="title"
                className="form-control"
                placeholder="輸入欲查詢課程..."
              />
            </form>
          </div>
        </div>

        <p>安安</p>
      </>
    );
  }
}
class Comment extends Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexFlow: 'column nowrap'
        }}
      >
        <div id={style.header}>
          <div className="text-center wow fadeInUp">
            <h1 className={style.headerTitle}>NTUEE 課程地圖</h1>
            <br />
            <p className={style.headerWord}>
              肥宅出得去
              <br />
              學妹進得來
              <br />
              電機發大財
            </p>
          </div>
        </div>
        <div>
          <StyledCommentTab />
        </div>
      </div>
    );
  }
}
export default Comment;
