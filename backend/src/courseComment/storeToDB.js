const mongoose = require('mongoose');
const { CourseComment } = require('../model.js');
const fs = require('fs');
const csv = require('csv-parser');
const csvtojson = require('csvtojson');
const semester = ['105_2', '106_1', '106_2'];
const type = ['專題', '十選二', '選修', '必修'];
// let counter = 0;
let results = [];

mongoose.connect('mongodb://test:debug1@ds231207.mlab.com:31207/course_test', {
  useNewUrlParser: true,
  useCreateIndex: true // Avoid node DeprecationWarning
});
mongoose.connection.once('open', () => {
  console.log('Successfully connected to MongoDB in storeToDB');
});
