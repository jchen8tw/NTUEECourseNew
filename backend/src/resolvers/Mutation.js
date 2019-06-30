const {
  Student,
  Course,
  CourseGroup,
  CourseComment,
  Wish
} = require('../model.js');
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
    return await student
      .save()
      .catch(err => console.log(err.errmsg || err.message));
  },

  async login(_, { data }, context) {
    const password = data.password;
    const student_id = data.student_id.toUpperCase();

    const student = await Student.findOne({ id: student_id }).exec();
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
        await student
          .save()
          .catch(err => console.log(err.errmsg || err.message));
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
      const id = Buffer.from(name + teacher).toString('base64'); //use base64 name+teacher to prevent duplicate import
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
    await CourseGroup.deleteMany({}); // Remove old courses before importing
    await CourseGroup.insertMany(courseGroupList).then(
      docs => (groupInsertCount = docs.length)
    );
    newCourses.forEach(course => (course.group = nameHash[course.name]._id));
    await Course.deleteMany({});
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
    const { score } = data;
    if (score > 5) return '拎北跟你講過滿分5分聽不懂逆?欠嗆?';
    if (score < 0) return '阿不是不能低於0分?眼幹逆';
    if (!Number.isInteger(score * 2)) return '要是0.5分為一等級啦87';
    let courseComment = new CourseComment({
      _id,
      ...data
    });
    await courseComment.save().catch(err => err.errmsg);
    return '成功上傳啦';
  },
  async createResponse(_, { data }, context) {
    const { author, content, comment_id } = data;
    await CourseComment.updateOne(
      { _id: comment_id },
      {
        $push: { responses: { author, content } }
      }
    ).exec();
    return 'success';
  },

  async changeNickname(_, { nickname }, context) {
    const student_id = context.passwordProcessor.getStudentID(context.token);
    const res = await Student.updateOne(
      { id: student_id },
      { $set: { nickname: nickname } }
    );
    return res.nModified !== 0;
  },

  async changePassword(_, { password }, context) {
    const student_id = context.passwordProcessor.getStudentID(context.token);
    const res = await Student.updateOne(
      { id: student_id },
      {
        $set: { hashedPassword: await context.passwordProcessor.hash(password) }
      }
    );
    return res.nModified !== 0;
  },

  async updateWish(_, { data }, context) {
    const { course_name, priority } = data;
    const student_id = context.passwordProcessor.getStudentID(context.token);
    if (!priority || priority.length === 0) {
      // Set priority to empty array => remove from wishes
      let res = await Wish.findOneAndDelete({
        student_ids: student_id,
        course_name
      });
      if (res) {
        res = res.toObject();
        res.priority = [];
      } // not found => return a dummy wish to update frontend
      else
        res = {
          _id: 'dummy_id',
          course_name,
          priority,
          student_ids: [student_id]
        };
      return res;
    }
    let wish = await Wish.findOne({ student_ids: student_id, course_name });
    if (wish === null)
      wish = new Wish({ student_ids: [student_id], course_name, priority });
    else wish.priority = priority;
    return await wish
      .save()
      .catch(err => console.log(err.errmsg || err.message));
  },

  async updateWishWithTeammate(_, { data }, context) {
    let { student_ids, course_name, priority } = data;
    student_ids = student_ids.map(i => i.toUpperCase());
    await Wish.deleteMany({
      student_ids: { $in: student_ids },
      course_name
    }); // [Crucial] delete all wishes of the same course with duplicated student id
    if (!priority || priority.length === 0) {
      // Set priority to empty array => remove from wishes
      // return a dummy wish to update frontend
      return {
        _id: 'dummy_id',
        course_name,
        priority,
        student_ids: []
      };
    }
    let wish = new Wish({ student_ids, course_name, priority });
    return await wish
      .save()
      .catch(err => console.log(err.errmsg || err.message));
  }
};

module.exports = { Mutation };
