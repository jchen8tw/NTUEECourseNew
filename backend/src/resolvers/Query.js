const {
  Student,
  CourseGroup,
  Course,
  CourseComment,
  Wish
} = require('../model.js');

const Query = {
  async me(_, __, context) {
    if (!context.passwordProcessor.isValid(context.token))
      throw new Error('invalid token');
    const student_id = context.passwordProcessor.getStudentID(context.token);
    return await Student.findOne({ id: student_id }).exec();
  },
  async getAuthor(_, __, context) {},

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
    console.log(filter);
    let mongooseFilter = {};
    if (type !== 'all') mongooseFilter.type = type;
    if (filter.name)
      mongooseFilter.name = { $regex: filter.name, $options: 'i' };
    if (filter.teacher)
      mongooseFilter.teacher = { $regex: filter.teacher, $options: 'i' };
    if (filter.author)
      mongooseFilter.author = { $regex: filter.author, $options: 'i' };
    let list = await CourseComment.find(mongooseFilter)
      .sort({ semester: -1 })
      .exec();
    return list.map(async comment => {
      if (comment['author']) {
        let authorInfo = await Student.findOne({
          id: comment.author
        }).exec();
        comment['author'] = authorInfo.nickname;
      }
      return comment;
    });
    // return await CourseComment.deleteMany({});
  },

  async getComment(_, args, context) {
    const { _id } = args;
    let commentRaw = await CourseComment.findById({ _id }).exec();
    commentRaw = commentRaw.toObject();
    if (commentRaw['author']) {
      let authorInfo = await Student.findOne({
        id: commentRaw.author
      }).exec();
      commentRaw['author'] = authorInfo.nickname;
    }
    if (commentRaw['responses'].length > 0) {
      commentRaw['responses'] = await Promise.all(
        commentRaw['responses'].map(async response => {
          if (response.author) {
            let authorInfo = await Student.findOne({
              id: response.author
            });
            response.author = authorInfo.nickname;
          }
          return response;
        })
      );
    }

    return commentRaw;
  },

  async allWishes(_, __, context) {
    const student_id = context.passwordProcessor.getStudentID(context.token);
    let res = await Wish.find({ student_ids: student_id }).exec();
    return res;
  }
};

module.exports = { Query };
