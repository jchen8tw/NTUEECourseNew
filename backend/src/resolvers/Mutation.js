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
        await student.save().catch(err => console.log(err.errmsg));
        raw = token;
      }
      /*
      context.res.cookie('authorization', raw, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 3 // 3 hours
      });
      */
      return { raw };
    }
    throw new Error('Authentication failed: Wrong password, please try again');
  }
};

module.exports = { Mutation };
