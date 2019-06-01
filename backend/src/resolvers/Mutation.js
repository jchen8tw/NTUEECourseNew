const { Student } = require('../model.js');

const Mutation = {
  async addUser(obj, args) {
    let student = new Student({ id: args.student_id });
    return await student.save().catch(err => console.log(err.errmsg));
  }
};

module.exports = { Mutation };
