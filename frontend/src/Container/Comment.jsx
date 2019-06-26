import React, { Component } from 'react';
import style from './Comment.module.css';

class Comment extends Component {
  render() {
    return (
      <div>
        <div id={style.commentHeader} className="jumbotron">
          <div className="container text-center wow fadeInUp">
            <h1 className={style.commentHeaderWord}>NTUEE 課程地圖</h1>
            <p>加入電機 共創奇蹟</p>
          </div>
        </div>
      </div>
    );
  }
}
export default Comment;
