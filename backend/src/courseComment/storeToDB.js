const mongoose = require('mongoose');
const { CourseComment } = require('../model.js');
const fs = require('fs');
const semester = ['105-2', '106-1', '106-2', '107-1', '107-2'];
const type = ['專題', '十選二', '選修', '必修'];
// let counter = 0;
let results = [];

mongoose.connect('mongodb://test:debug1@ds231207.mlab.com:31207/course_test', {
  useNewUrlParser: true,
  useCreateIndex: true // Avoid node DeprecationWarning
});
mongoose.connection.once('open', () => {
  console.log('Successfully connected to MongoDB in storeToDB');
  for (let i = 0; i < semester.length * type.length; ++i) {
    if (i === 3) continue;
    fs.readFile(
      `./JSONFiles/${semester[Math.floor(i / 4)]}_${type[i % 4]}.json`,
      'utf-8',
      function(err, data) {
        if (err) {
          console.error(err);
          throw new Error(err);
        } else {
          a = JSON.parse(data).map(comment => {
            if (!comment['開課教授']) throw new Error('No teacher' + i);

            return {
              type: type[i % 4],
              semester: semester[Math.floor(i / 4)],
              domain: comment['領域'] || '',
              name: comment['課程名稱'] || '專題',
              teacher: comment['開課教授'],
              studyTogether:
                comment['推薦同時修習的課程：'] ||
                comment['推薦一起修之課程名稱'] ||
                comment['推薦同時修習的課程'] ||
                '',
              studyBefore: comment['推薦預先修習的課程'] || '',
              content:
                comment[
                  Object.keys(comment).filter(
                    key => key.includes('課程小卦') && comment[key]
                  )[0]
                ],
              responses: Object.keys(comment)
                .filter(
                  key =>
                    !key.includes('課程小卦1') &&
                    key.includes('課程小卦') &&
                    comment[key]
                )
                .map(key => ({ author: null, content: comment[key] }))
            };
          });
          //   console.log(a);
          a.map(comment => {
            if (
              !(
                comment.domain.includes('範例') ||
                comment.teacher.includes('範例')
              )
            )
              results.push(comment);
          });
        }
      }
    );
  }
  setTimeout(() => {
    CourseComment.insertMany(results);
    console.log(results);
  }, 10000);
});
