import React, { Component } from 'react';
import style from './Comment.module.css';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 10 * 3 }}>
      {props.children}
    </Typography>
  );
}
const styles = theme => ({
  allRoot: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  button: {
    margin: theme.spacing.unit
  },
  CommentTitleListRawRoot: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    maxWidth: '1000px'
  },
  tableCell: {
    padding: '0 3% 0 2%',
    minWidth: '80px',
    height: '60px',
    fontSize: '1.2em'
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
              <CommentList show="tenChooseTwo" />
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

class CommentTitleListRaw extends Component {
  constructor(props) {
    super(props);
    let id = 0;
  }
  createData = (name, type, teacher, score, author) => {
    id += 1;
    return { name, type, teacher, score, author };
  };
  render() {
    const rows = [
      this.createData('107-1 電磁學二', '必修', '毛紹綱', '5分', 'ChrisHH'),
      this.createData('107-1 電磁學二', '必修', '李翔傑', '4分', 'rumrumrum'),
      this.createData(
        '107-1 平面顯示與技術通論',
        '選修',
        '黃建璋',
        '5分',
        'penguin0172'
      )
    ];

    const { classes } = this.props;

    return (
      <Paper className={classes.CommentTitleListRawRoot}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableCell}>名稱</TableCell>
              <TableCell align="right" className={classes.tableCell}>
                類別
              </TableCell>
              <TableCell align="right" className={classes.tableCell}>
                開課教授
              </TableCell>
              <TableCell align="right" className={classes.tableCell}>
                推薦分數
              </TableCell>
              <TableCell align="right" className={classes.tableCell}>
                作者
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell
                  component="th"
                  scope="row"
                  className={classes.tableCell}
                >
                  {row.name}
                </TableCell>
                <TableCell align="right" className={classes.tableCell}>
                  {row.type}
                </TableCell>
                <TableCell align="right" className={classes.tableCell}>
                  {row.teacher}
                </TableCell>
                <TableCell align="right" className={classes.tableCell}>
                  {row.score}
                </TableCell>
                <TableCell align="right" className={classes.tableCell}>
                  {row.author}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}
const CommentTitleList = withStyles(styles)(CommentTitleListRaw);
class CommentListRaw extends Component {
  handleCourseClick = e => {
    e.preventDefault();
    console.log(this.state.searchContent);
  };
  changeValue = e => {
    this.setState({ searchContent: e.target.value });
  };
  constructor(props) {
    super(props);
    this.state = { searchContent: '' };
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.allRoot}>
        <form onSubmit={this.handleSubmit} className={style.flexContainer}>
          <input
            type="text"
            name="title"
            className="form-control col-6"
            placeholder="輸入關鍵字"
            style={{ flexGrow: '1' }}
            onChange={this.changeValue}
            value={this.state.searchContent}
          />
          <Button
            variant="outlined"
            type="submit"
            className={classes.button}
            color="inherit"
            onClick={this.handleCourseClick}
          >
            課名
          </Button>
          <Button
            variant="outlined"
            type="submit"
            className={classes.button}
            color="inherit"
            // onClick={this.han}
          >
            作者
          </Button>
          <Button
            variant="outlined"
            type="submit"
            className={classes.button}
            color="inherit"
          >
            評論數
          </Button>
        </form>
        <CommentTitleList show={this.props.show} />
      </div>
    );
  }
}
const CommentList = withStyles(styles)(CommentListRaw);

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
              {'肥宅出得去\n學妹進得來\n電機發大財'}
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
