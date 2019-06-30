const { admission } = require('./admission');
const { class_info_db2backend, wish_db2backend } = require('./converter');
const { Course, Wish } = require('../src/model');
const mongoose = require('mongoose');
var fs = require('fs');
var stream = fs.createWriteStream('./result.json');
function connect_to_db() {
  mongoose.connect(
    'mongodb://test:debug1@ds231207.mlab.com:31207/course_test',
    {
      useNewUrlParser: true,
      useCreateIndex: true // Avoid node DeprecationWarning
    }
  );
  mongoose.connection.once('open', () => {
    console.log('Successfully connected to MongoDB');
    //insert_to_db();
  });
}
async function allocate() {
  let course = await Course.find({})
    .populate('group')
    .exec()
    .catch(err => new Error(err));
  let wish = await Wish.find({}).catch(err => new Error(err));
  //console.log(course);
  let class_info = class_info_db2backend(course);
  //console.log(class_info);
  let [wishes, group_info] = wish_db2backend(wish, class_info);
  //console.log(wishes,group_info);
  let [per_class_result,per_stu_result] = admission(wishes, class_info, group_info);
  console.log(per_stu_result);
/*
  await stream.once('open', function(fd) {
    stream.write(JSON.stringify(per_stu_result));
    stream.end();
  });
  */
}
connect_to_db();
allocate();
