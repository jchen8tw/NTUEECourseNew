const { Student } = require('../model.js');

const Query = {
  async me(_, args) {
    return await Student.findOne({ id: args.student_id }).exec();
  }
};

module.exports = { Query };
