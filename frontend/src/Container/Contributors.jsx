import React, { Component } from 'react';
import style from './Contributors.module.css';
import { withStyles } from '@material-ui/core/styles';
import { Paper, CircularProgress, TextField, Button } from '@material-ui/core';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textFieldComment: {
    maxWidth: '950px',
    minWidth: '350px',
    width: '90%',
    margin: '10px 5%',
    textAlign: 'right'
  },
  button: {
    margin: theme.spacing.unit
  }
});

class Contributors extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={style.allRoot}>
        <Paper className={style.pageRoot}>
          <h2>課程評價網頁設計</h2> <h3>B06林泓均</h3> <h3>B06李子筠</h3>
          <h3>B06陳昱行</h3>
          <h2>發行人 </h2>
          <h3>台大電機工程學系學生會</h3>
          <h2>一版 </h2>
          <h3>主編</h3>
          <h4>b01 陳韻竹</h4>
          <h2>二版 </h2>
          <h3>主編</h3>
          <h4>{`b03 許秉鈞
          b03 劉禹辰（系學會學術部）`}</h4>
          <h3>編輯群</h3>
          <h4 style={{ whiteSpace: 'pre-line' }}>{`b03 孫凡耕（系學會學術部）
          b03 郭子生（系學會學術部）
          b03 林芳宇
          b03 張雅量
          b03 林波尼
          b03 簡睿廷
          b02 陶昇永
          `}</h4>
          <h2>三版 </h2>
          <h3>主編</h3>
          <h4>{`b04 鄭閎（系學會學術部)`}</h4>
          <h3>編輯群</h3>
          <h4 style={{ whiteSpace: 'pre-line' }}>{`b04 毛弘仁
          b04 古庭瑜
          b03 郭笛萱
          b04 林昱嘉
          `}</h4>
          <h2>四版 </h2>
          <h3>編輯群</h3>
          <h4 style={{ whiteSpace: 'pre-line' }}>{`b04 劉記良
          b03 徐一真
          b04 陳博彥
          b04 莫絲羽
          b05 鄭昕
          b05 高瑋聰
          `}</h4>
          <h2>五版 </h2>
          <h3>編輯群</h3>
          <h4 style={{ whiteSpace: 'pre-line' }}>{`b04 解正平
          b05 施力維（系學會學術部）
          `}</h4>
          <h2>六版 </h2>
          <h3>編輯群</h3>
          <h4 style={{ whiteSpace: 'pre-line' }}>{`b05 廖學儒
          b05 林以謙
          b05 鄭昕
          b04 林昱嘉
          `}</h4>
          <h2>七版 </h2>
          <h3>編輯群</h3>
          <h4 style={{ whiteSpace: 'pre-line' }}>{`b06 黃士豪
          b06 楊軒
          b06 林軒毅（學術部）
          b05 劉衡謙
          b06 黃昱翰
          `}</h4>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Contributors);
