const { Student, Course, CourseGroup, CourseComment } = require('../model.js');
const mongoose = require('mongoose');
const Buffer = require('buffer').Buffer;

const Mutation = {
  async createStudent(_, { data }, context) {
    if (!context.passwordProcessor.isValid(context.token)) {
      throw new Error('invalid token');
    }
    const { student_id, password, nickname, fullname } = data;
    const hashedPassword = await context.passwordProcessor.hash(password);
    let student = new Student({
      id: student_id,
      hashedPassword,
      nickname: nickname,
      fullname: fullname
    });
    return await student.save().catch(err => console.log(err.errmsg));
  },

  async login(_, { data }, context) {
    const { student_id, password } = data;
    // compare case insensitive
    const student = await Student.findOne({
      id: student_id.toUpperCase()
    }).exec();
    if (!student)
      throw new Error(
        'Authentication failed: User not found, please try again'
      );
    // It is easy to tell if a student ID exist or not, so showing this error is acceptable
    const same = await context.passwordProcessor.compare(
      password,
      student.hashedPassword
    );
    if (same) {
      let raw = null;
      if (context.passwordProcessor.isValid(student.token)) raw = student.token;
      else {
        const token = await context.passwordProcessor.issueToken(student_id);
        student.token = token;
        await student.save().catch(err => console.log(err.errmsg));
        raw = token;
      }
      return { raw };
    }
    throw new Error('Authentication failed: Wrong password, please try again');
  },

  async submitCourse(_, { data }, context) {
    let courseList = data.content.split(/\r\n|\r|\n/);
    let newCourses = courseList.map(item => {
      const _id = new mongoose.Types.ObjectId();
      const [__, _, teacher, name, limit, grade] = item.split(',');
      const id = new Buffer(name + teacher).toString('base64'); //use base64 name+teacher+grade to prevent duplicate import
      return { _id, id, teacher, name, limit, grade };
    });

    /*
    nameHash = {
      CourseGroupNameA: {
        _id: ObjectID,
        grade: course.grade,
        courses: [CourseObjectID]
      },
      CourseGroupNameB: {
        _id: ObjectID,
        grade: course.grade,
        courses: [CourseObjectID]
      }
    }
     */
    let nameHash = {};
    newCourses.forEach(course => {
      if (nameHash[course.name]) {
        nameHash[course.name].courses.push(course._id);
      } else {
        nameHash[course.name] = {
          courses: [course._id],
          grade: course.grade,
          _id: new mongoose.Types.ObjectId()
        };
      }
    });

    const courseNames = Object.keys(nameHash);
    courseGroupList = courseNames.map(
      name => new CourseGroup({ ...nameHash[name], name })
    );
    let groupInsertCount = 0;
    let courseInsertCount = 0;
    await CourseGroup.remove(); // Remove old courses before importing
    await CourseGroup.insertMany(courseGroupList).then(
      docs => (groupInsertCount = docs.length)
    );
    newCourses.forEach(course => (course.group = nameHash[course.name]._id));
    await Course.remove();
    await Course.insertMany(newCourses, { ordered: false }).then(
      docs => (courseInsertCount = docs.length)
    );
    return `${courseInsertCount} courses, ${groupInsertCount} groups inserted`;
  },

  async submitStudent(_, { data }, context) {
    let studentList = data.content.split(/\r\n|\r|\n/);
    const defaultPassword = '123';
    const nickname = '';
    let newStudents = await Promise.all(
      studentList.map(async item => {
        const [id, fullname] = item.split(',');
        const hashedPassword = await context.passwordProcessor.hash(
          defaultPassword
        );
        return { id, fullname, hashedPassword, nickname };
      })
    );
    // student_id must be unique, otherwise import will fail
    // ordered: false, emit error on duplicated student_id, but continues to insert the rest
    return await Student.insertMany(newStudents, { ordered: false }).then(
      docs => `${docs.length} data inserted`
    );
  },
  async createComment(_, { data }, context) {
    const _id = new mongoose.Types.ObjectId();
    let courseComment = new CourseComment({
      _id,
      ...data
    });
    return await courseComment.save().catch(err => console.log(err.errmsg));
  },

  async changeNickname(_, { student_id, nickname }, context) {
    const res = await Student.updateOne(
      { id: student_id },
      { $set: { nickname: nickname } }
    );
    return res.nModified !== 0;
  },

  async changePassword(_, { student_id, password }, context) {
    const res = await Student.updateOne(
      { id: student_id },
      {
        $set: { hashedPassword: await context.passwordProcessor.hash(password) }
      }
    );
    return res.nModified !== 0;
  }
};

module.exports = { Mutation };
