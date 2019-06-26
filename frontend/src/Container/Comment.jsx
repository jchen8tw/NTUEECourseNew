import React, { Component } from 'react';
import style from './Comment.module.css';

class Comment extends Component {
  render() {
    return (
      //   <div style={{ display: 'flex', flexFlow: 'column nowrap', overflowY: 'initial' }}>
      <>
        <div id={style.header}>
          <div className="text-center wow fadeInUp">
            <h1 className={style.headerWord}>NTUEE 課程地圖</h1>
            <p>加入電機 共創奇蹟</p>
          </div>
        </div>
        <div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Tortor
            dignissim convallis aenean et tortor at. Ut enim blandit volutpat
            maecenas volutpat blandit aliquam etiam erat. Aliquam sem fringilla
            ut morbi tincidunt augue interdum velit. Cursus metus aliquam
            eleifend mi in nulla posuere. Lorem ipsum dolor sit amet consectetur
          </p>
        </div>
      </>
    );
  }
}
export default Comment;
