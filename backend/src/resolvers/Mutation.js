const { Student } = require('../model.js');

const Mutation = {
  async createStudent(_, { data }, context) {
    const { student_id, password } = data;
    const hashedPassword = await context.passwordProcessor.hash(password);
    let student = new Student({ id: student_id, hashedPassword });
    return await student.save().catch(err => console.log(err.errmsg));
  },
  async login(_, { data }, context) {
    const { student_id, password } = data;
    const student = await Student.findOne({ id: student_id }).exec();
    if (!student) return null;
    const same = await context.passwordProcessor.compare(
      password,
      student.hashedPassword
    );
    if (same) {
      if (context.passwordProcessor.isValid(student.token))
        return { raw: student.token };
      const token = await context.passwordProcessor.issueToken(student_id);
      student.token = token;
      await student.save().catch(err => console.log(err.errmsg));
      return { raw: token };
    }
    return null;
  }
};

module.exports = { Mutation };
