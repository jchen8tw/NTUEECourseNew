const { Student, CourseGroup, Course } = require('../model.js');

const Query = {
  async me(_, { student_id }, context) {
    if(!context.passwordProcessor.isValid(context.token)) throw new Error('invalid token');
    return await Student.findOne({ id: student_id }).exec();
  },
  async allCourseGroups(_,__,context) {
    //TODO
    //need to check token
    if (!context.passwordProcessor.isValid(context.token)) throw new Error('invalid token');
    return await CourseGroup.find({}).populate('courses').exec();
  },
  async allTeacher(_,__,context) {
    if (!context.passwordProcessor.isValid(context.token)) throw new Error('invalid token');
    return await Course.find({})
      .populate('group')
      .exec();
  }
};

module.exports = { Query };
