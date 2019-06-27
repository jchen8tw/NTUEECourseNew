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
    const { type, name, teacher } = args;
    if (type === 'all') {
      if (name)
        return await CourseComment.find({
          name: { $regex: name, $options: 'i' }
        })
          .sort({ semester: -1 })
          .exec();
      else if (teacher)
        return await CourseComment.find({
          teacher: { $regex: teacher, $options: 'i' }
        })
          .sort({ semester: -1 })
          .exec();
      else
        return await CourseComment.find({})
          .sort({ semester: -1 })
          .exec();
    } else {
      if (name)
        return await CourseComment.find({
          type,
          name: { $regex: name, $options: 'i' }
        })
          .sort({ semester: -1 })
          .exec();
      else if (teacher)
        return await CourseComment.find({
          type,
          teacher: { $regex: teacher, $options: 'i' }
        })
          .sort({ semester: -1 })
          .exec();
      else
        return await CourseComment.find({ type })
          .sort({ semester: -1 })
          .exec();
    }
    // return await CourseComment.deleteMany({});
  }
};

module.exports = { Query };
