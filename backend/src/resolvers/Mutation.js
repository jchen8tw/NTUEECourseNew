const { Student, Course, CourseGroup } = require('../model.js');
const mongoose = require('mongoose');

const Mutation = {
  async createStudent(_, { data }, context) {
    if (!context.passwordProcessor.isValid(context.token)) {
      throw new Error('invalid token');
    }
    const { student_id, password, nickname, fullname } = data;
    const hashedPassword = await context.passwordProcessor.hash(password);
    let student = new Student({
      id: student_id,
      hashedPassword,
      nickname: nickname,
      fullname: fullname
    });
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
  },
  async adminSubmit(_, { data }, context) {
    const { title, content } = data;
    if (title === 'adminStudentData') {
      studentList = content.split(/\r\n|\r|\n/);
      const test_password = '123';
      const nickname = '';
      let newStudents = await Promise.all(
        studentList.map(async item => {
          const [student_id, fullname] = item.split(',');
          const hashedPassword = await context.passwordProcessor.hash(
            test_password
          );
          return { id: student_id, fullname, hashedPassword, nickname };
        })
      );
      console.log(newStudents);
      //student_id must be unique in db
      //or otherwise the import will fail
      try {
        await Student.insertMany(newStudents, { ordered: false });
      } catch (_) {
        throw new Error('import failed');
      }
    } else if (title === 'adminCourseData') {
      courseList = content.split(/\r\n|\r|\n/);
      let newCourses = courseList.map(item => {
        const _id = new mongoose.Types.ObjectId();
        const [__, _, teacher, name, limit, grade] = item.split(',');
        return { _id, teacher, name, limit, grade };
      });
      //courselist without courseGroup
      let nameHash = {};
      console.log(newCourses);
      newCourses.forEach(course => {
        if (nameHash[course.name]) {
          nameHash[course.name].courses.push(course._id);
        } else {
          nameHash[course.name] = {
            courses: [course._id],
            grade: course.grade,
            _id: new mongoose.Types.ObjectId()
          };
        }
      });
      const courseNames = Object.keys(nameHash);
      courseGroupList = courseNames.map(
        name => new CourseGroup({ ...nameHash[name], name })
      );
      console.log(courseGroupList);
      CourseGroup.insertMany(courseGroupList);
      newCourses.forEach(course => (course.group = nameHash[course.name]._id));
      console.log(newCourses);
      Course.insertMany(newCourses, { ordered: false });
      /*for i in courseList:
        if nameHash[i.name]:
          nameHash[i].push(i.id)
        else:
          nameHash[i] = [i.id]
      for courseName in Object.keys(nameHash):
        let c = new CourseGroup({_id: new ObjectID(), courses: nameHash[courseName], id, grade})
      await CourseGroup.insertMnay([]);
      for i in CourseGroup.selectMany():
      for j in i.courses:
        j.courseGroup = i.id
*/
    } else
      throw new Error('The title does not exist,DO NOT POKE API ARBITRARILY');
  }
};

module.exports = { Mutation };
