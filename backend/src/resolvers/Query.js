const { Student, CourseGroup } = require('../model.js');

const Query = {
  async me(_, { student_id }, context) {
    if (!context.token) return null;
    return await Student.findOne({ id: student_id }).exec();
  },
  async allCourseGroups() {
    return await CourseGroup.find({}).exec();
  }
};

module.exports = { Query };
