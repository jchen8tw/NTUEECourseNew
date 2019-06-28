const { Student, CourseGroup, Course, CourseComment } = require('../model.js');

const Query = {
  async me(_, { student_id }, context) {
    if (!context.passwordProcessor.isValid(context.token))
      throw new Error('invalid token');
    return await Student.findOne({ id: student_id }).exec();
  },

  async allCourseGroups(_, __, context) {
    //TODO
    //need to check token
    if (!context.passwordProcessor.isValid(context.token))
      throw new Error('invalid token');
    return await CourseGroup.find({})
      .populate('courses')
      .exec();
  },

  async allTeacher(_, __, context) {
    if (!context.passwordProcessor.isValid(context.token))
      throw new Error('invalid token');
    return await Course.find({})
      .populate('group')
      .exec();
  },

  async getCommentList(_, args, context) {
    const { type, filter } = args;
    let mongooseFilter = {};
    if (type !== 'all') mongooseFilter.type = type;
    if (filter.name)
      mongooseFilter.name = { $regex: filter.name, $options: 'i' };
    if (filter.teacher)
      mongooseFilter.teacher = { $regex: filter.teacher, $options: 'i' };

    return await CourseComment.find(mongooseFilter)
      .sort({ semester: -1 })
      .exec();
    // return await CourseComment.deleteMany({});
  },

  async getComment(_, args, context) {
    const { _id } = args;
    return await CourseComment.findById({ _id }).exec();
  }
};

module.exports = { Query };
