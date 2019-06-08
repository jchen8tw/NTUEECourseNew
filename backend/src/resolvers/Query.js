const { Student, CourseGroup } = require('../model.js');

const Query = {
  async me(_, { student_id }) {
    return await Student.findOne({ id: student_id }).exec();
  },
  async allCourseGroups() {
    return await CourseGroup.find({}).exec();
  }
};

module.exports = { Query };
