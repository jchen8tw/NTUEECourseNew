import React, { Component, useEffect } from 'react';
import style from './CommentList.module.css';
import CommentPage from './CommentPage.jsx';
import CommentCreate from './CommentCreate.jsx';
import CommentManage from './CommentManage';
import CommentModify from './CommentModify';
import Contributors from './Contributors';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Input,
  Button
} from '@material-ui/core';
import { Route, Link } from 'react-router-dom';

import { handleTabChange } from '../redux/actions';
import { connect } from 'react-redux';

import { Query } from 'react-apollo';
import { QUERY_COMMENT_LIST } from '../graphql/query';
import classNames from 'classnames';

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
    minWidth: '400px'
  },
  maintable: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  },
  tableCell: {
    padding: '0 3% 0 2%',
    minWidth: '70px',
    minHeight: '70px',
    fontSize: '1.2em',
    width: '20%',
    '& > a': {
      color: 'inherit'
    }
  },
  input: {
    maxWidth: '350px'
  },
  tableCellType: {
    padding: '0 3% 0 2%',
    minWidth: '30px',
    minHeight: '70px',
    fontSize: '1.2em',
    '& > a': {
      color: 'inherit'
    },
    width: '15%'
  },
  tableCellScore: {
    padding: '0 3% 0 2%',
    minWidth: '20px',
    minHeight: '70px',
    fontSize: '1.2em',
    width: '10%',
    '& > a': {
      color: 'inherit'
    }
  },
  tableCellTeacher: {
    padding: '0 3% 0 2%',
    minWidth: '20px',
    minHeight: '70px',
    fontSize: '1.2em',
    width: '15%',
    '& > a': {
      color: 'inherit'
    }
  }
});

const tabs = ['all', '必修', '選修', '十選二', '專題'];

class CommentTab extends Component {
  state = {
    tabIndex: 0
  };

  handleChange = (event, tabIndex) => {
    this.setState({ tabIndex });
  };

  render() {
    const { classes } = this.props;
    const { tabIndex } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="sticky" color="default">
          <Tabs
            value={tabIndex}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="全部顯示" component={Link} to={'/commentlist'} />
            <Tab label="必修" component={Link} to={'/commentlist'} />
            <Tab label="選修" component={Link} to={'/commentlist'} />
            <Tab label="十選二" component={Link} to={'/commentlist'} />
            <Tab label="專題" component={Link} to={'/commentlist'} />
            <Tab label="發表評論" component={Link} to={'/commentlist'} />
            <Tab label="文章管理" component={Link} to={'/commentlist'} />
            <Tab label="歷代貢獻者" component={Link} to={'/commentlist'} />
          </Tabs>
        </AppBar>
        {tabIndex < tabs.length && (
          <TabContainer>
            <Route
              path={'/commentlist/:id'}
              render={props => <CommentPage {...props} />}
            />
            <Route
              exact
              path={'/commentlist'}
              render={props => <CommentList show={tabs[tabIndex]} {...props} />}
            />
          </TabContainer>
        )}
        {tabIndex === 5 && (
          <Route exact path="/commentlist" component={CommentCreate} />
        )}
        {tabIndex === 6 && (
          <TabContainer>
            <Route
              exact
              path="/commentlist"
              render={props => <CommentManage {...props} />}
            />
            <Route
              path={'/commentlist/:id'}
              render={props => <CommentModify modify={true} {...props} />}
            />
          </TabContainer>
        )}
        {tabIndex === 7 && (
          <Route exact path="/commentlist" component={Contributors} />
        )}
      </div>
    );
  }
}
const StyledCommentTab = withStyles(styles)(CommentTab);

class CommentTitleListRaw extends Component {
  render() {
    const { classes, searchContent, searchType } = this.props;
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
    return (
      <Paper className={classes.CommentTitleListRawRoot}>
        <Table className={classes.maintable}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableCell}>名稱</TableCell>
              <TableCell align="right" className={classes.tableCellType}>
                類別
              </TableCell>
              <TableCell align="right" className={classes.tableCellTeacher}>
                開課教授
              </TableCell>
              <TableCell align="right" className={classes.tableCellScore}>
                分數
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
                    <TableRow>
                      <td row="5">{'正在查詢中，等一下啦 > <'}</td>
                    </TableRow>
                  </TableBody>
                );
              if (error) return `Error! ${error.message}`;
              return (
                <TableBody>
                  {data.getCommentList.map(row => (
                    <TableRow key={row._id}>
                      <TableCell scope="row" className={classes.tableCell}>
                        <Link to={`/commentlist/${row._id}`}>{`${
                          row.semester
                        } ${row.name}`}</Link>
                      </TableCell>
                      <TableCell
                        align="right"
                        className={classes.tableCellType}
                      >
                        {row.domain === '' || row.domain === row.type
                          ? row.type
                          : `${row.type}/${row.domain}`}
                      </TableCell>
                      <TableCell
                        align="right"
                        className={classes.tableCellTeacher}
                      >
                        {row.teacher}
                      </TableCell>
                      <TableCell
                        align="right"
                        className={classes.tableCellScore}
                      >
                        {Number.isFinite(row.score) && row.score}
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
            開課教授
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

const mapDisPatchToProps = dispatch => {
  return { handleTopTabChange: payload => dispatch(handleTabChange(payload)) };
};
function Comment(props) {
  useEffect(() => {
    props.handleTopTabChange(2);
  });
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
          <p className={classNames(style.headerWord)}>
            {'堅定支持一個電機原則\n反對任何形式的"電機"分裂活動'}
          </p>
        </div>
      </div>

      <StyledCommentTab />
    </div>
  );
}
const connectedComment = connect(
  undefined,
  mapDisPatchToProps
)(Comment);
export default connectedComment;
