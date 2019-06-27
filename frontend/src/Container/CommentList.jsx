import React, { Component } from 'react';
import style from './CommentList.module.css';
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
import Input from '@material-ui/core/Input';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
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
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  appBar: {
    position: 'sticky',
    top: 0
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
    maxWidth: '1000px',
    minWidth: '450px'
  },
  tableCell: {
    padding: '0 3% 0 2%',
    minWidth: '80px',
    minHeight: '70px',
    fontSize: '1.2em'
  },
  input: {
    maxWidth: '350px'
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
        <AppBar position="static" color="default" className={classes.appBar}>
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
              <CommentList show="必修" />
            </TabContainer>
          )}
          {value === 2 && (
            <TabContainer>
              <CommentList show="選修" />
            </TabContainer>
          )}
          {value === 3 && (
            <TabContainer>
              <CommentList show="十選二" />
            </TabContainer>
          )}
          {value === 4 && (
            <TabContainer>
              <CommentList show="專題" />
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

const QUERY_COMMENT_LIST = gql`
  query($type: String!, $name: String, $teacher: String) {
    getCommentList(type: $type, name: $name, teacher: $teacher) {
      semester
      name
      _id
      type
      domain
      teacher
    }
  }
`;

class CommentTitleListRaw extends Component {
  constructor(props) {
    super(props);
    let id = 0;
  }
  render() {
    const { classes, searchContent, searchType } = this.props;
    // console.log('searchContent:', searchContent);
    // console.log('searchType : ', searchType);
    let searchContentName = '';
    let searchContentTeacher = '';
    if (searchType === 'name') {
      searchContentName = searchContent;
      searchContentTeacher = '';
    } else if (searchType === 'teacher') {
      searchContentName = '';
      searchContentTeacher = searchContent;
    } else if (searchType === 'noSearch') {
      searchContentName = '';
      searchContentTeacher = '';
    }
    // console.log('name : ', searchContentName);
    // console.log('teacher : ', searchContentTeacher);
    return (
      <>
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
            <Query
              query={QUERY_COMMENT_LIST}
              variables={{
                type: this.props.show,
                name: searchContentName,
                teacher: searchContentTeacher
              }}
            >
              {({ loading, error, data }) => {
                if (loading)
                  return (
                    <TableBody className={style.loadingStyle}>
                      {'正在查詢中，等一下啦 > <'}
                    </TableBody>
                  );
                if (error) return `Error! ${error.message}`;
                return (
                  <TableBody>
                    {data.getCommentList.map(row => (
                      <TableRow key={row._id}>
                        <TableCell
                          component="th"
                          scope="row"
                          className={classes.tableCell}
                        >
                          {row.semester + ' ' + row.name}
                        </TableCell>
                        <TableCell align="right" className={classes.tableCell}>
                          {row.domain === '' || row.domain === row.type
                            ? row.type
                            : row.type + '/' + row.domain}
                        </TableCell>
                        <TableCell align="right" className={classes.tableCell}>
                          {row.teacher}
                        </TableCell>
                        <TableCell align="right" className={classes.tableCell}>
                          {row.score || ''}
                        </TableCell>
                        <TableCell align="right" className={classes.tableCell}>
                          {row.author || ''}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                );
              }}
            </Query>
          </Table>
        </Paper>
      </>
    );
  }
}
const CommentTitleList = withStyles(styles)(CommentTitleListRaw);
class CommentListRaw extends Component {
  constructor(props) {
    super(props);
    this.state = { searchContent: '', searchType: 'noSearch' };
  }
  handleNameClick = e => {
    e.preventDefault();
    this.setState({
      searchContent: this.state.searchContent,
      searchType: 'name'
    });
  };
  handleTeacherClick = e => {
    e.preventDefault();
    this.setState({
      searchContent: this.state.searchContent,
      searchType: 'teacher'
    });
  };
  changeValue = e => {
    this.setState({ searchContent: e.target.value, searchType: 'noSearch' });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.allRoot}>
        <form onSubmit={this.handleSubmit} className={style.flexContainer}>
          <Input
            placeholder="輸入關鍵字"
            className={classes.input}
            inputProps={{
              'aria-label': 'Description'
            }}
            style={{ flexGrow: '1' }}
            width="300"
            onChange={this.changeValue}
            value={this.state.searchContent}
          />

          <Button
            variant="outlined"
            type="submit"
            className={classes.button}
            color="inherit"
            onClick={this.handleNameClick}
          >
            課名
          </Button>
          <Button
            variant="outlined"
            type="submit"
            className={classes.button}
            color="inherit"
            onClick={this.handleTeacherClick}
          >
            教授
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
        <CommentTitleList
          show={this.props.show}
          searchContent={this.state.searchContent}
          searchType={this.state.searchType}
        />
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
