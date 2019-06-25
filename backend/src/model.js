const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
  id: { type: String, required: true, index: true, unique: true },
  hashedPassword: { type: String, required: true },
  fullname: { type: String, required: true },
  nickname: { type: String },
  token: { type: String }
});

const CourseSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
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

const Student = mongoose.model('Student', StudentSchema);
const Course = mongoose.model('Course', CourseSchema);
const CourseGroup = mongoose.model('CourseGroup', CourseGroupSchema);

module.exports = { Student, Course, CourseGroup };
