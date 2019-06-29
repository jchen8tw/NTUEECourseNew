const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
  id: { type: String, required: true, index: true, unique: true },
  hashedPassword: { type: String, required: true },
  fullname: { type: String, required: true },
  nickname: { type: String }
  //token: { type: String } no need to store token
});

const CourseSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
  id: { type: String, required: true, index: true, unique: true }, //use base64 name+teacher+grade to prevent duplicate import
  name: { type: String, required: true },
  limit: { type: Number, required: true },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'CourseGroup' },
  teacher: { type: String, required: true }
});

const CourseGroupSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
  courses: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    required: true
  },
  name: { type: String, required: true },
  grade: { type: Number, required: true }
});

const CourseCommentSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
  semester: { type: String, required: true },
  type: { type: String, required: true }, //必修、選修、十選二
  name: { type: String, required: true },
  domain: { type: String }, //CS、光電...
  teacher: { type: String, required: true },
  studyTogether: { type: String },
  studyBefore: { type: String },
  content: [{ type: String }],
  score: Number,
  author: String
});

const WishSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
  student_ids: {
    type: [{ type: String, required: true, unique: true }],
    required: true
  },
  course_name: { type: String, required: true },
  priority: [{ type: String, unique: true }]
});

const Student = mongoose.model('Student', StudentSchema);
const Course = mongoose.model('Course', CourseSchema);
const CourseGroup = mongoose.model('CourseGroup', CourseGroupSchema);
const CourseComment = mongoose.model('CourseComment', CourseCommentSchema);
const Wish = mongoose.model('Wish', WishSchema);

module.exports = { Student, Course, CourseGroup, CourseComment, Wish };
