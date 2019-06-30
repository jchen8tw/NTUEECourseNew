import React, { Component, useEffect } from 'react';
import CommentPage from './CommentPage.jsx';
import CommentCreate from './CommentCreate.jsx';
import style from './CommentManage.module.css';
import { connect } from 'react-redux';

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
import { handleTabChange,send_success } from '../redux/actions';
import { Query } from 'react-apollo';
import { QUERY_COMMENT_LIST } from '../graphql/query';
const mapStateToProps = state => {
  return { student_id: state.student_id, token: state.jwt };
};
const mapDispatchToProps = dispatch => ({
  sendSuccess: data => dispatch(send_success(data))
});
const styles = theme => ({
  allRoot: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'nowrap'
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

class CommentTitleListRaw extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
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
                type: 'all',
                author: JSON.parse(atob(this.props.token.split('.')[1])).id
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
                console.log(
                  JSON.parse(atob(this.props.token.split('.')[1])).id
                );
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
      </div>
    );
  }
}
const connectedCommentTitleListRaw = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentTitleListRaw);

export default withStyles(styles)(connectedCommentTitleListRaw);
