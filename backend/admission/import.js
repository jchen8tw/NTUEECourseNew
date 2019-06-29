const { random_testcase2 } = require('./test_generator');
const { Course, CourseGroup, Wish } = require('../src/model');
const util = require('util');
const mongoose = require('mongoose');
const Buffer = require('buffer').Buffer;
/**
 * 
 * @returns
 {
    'class 1':  [{ teacher_name: 'T1-1', max: 10 },
    { teacher_name: 'T1-2', max: 50 },
    { teacher_name: 'T1-3', max: 1000 }]
    .
    .
    .
    .
}
 */
function generate_course() {
  let course_info = {};
  for (let class_name = 1; class_name <= 12; class_name += 1) {
    let tmp_teachers = [];
    for (let teachers_name = 1; teachers_name <= 4; teachers_name += 1) {
      tmp_teachers.push({
        teacher_name: 'T' + String(class_name) + '-' + String(teachers_name),
        max: Math.floor(Math.random() * 100)
      });
      course_info['class ' + String(class_name)] = tmp_teachers;
    }
  }
  return course_info;
}
const courses_info = generate_course();
const student_wishes = random_testcase2(courses_info);

//generate coursegroup and courses from courses_info
//console.log(courses_info);
/**
 * course_info
 * {'class 1': [
    { teacher_name: 'T1-1', max: 2 },
    { teacher_name: 'T1-2', max: 56 },
    { teacher_name: 'T1-3', max: 72 },
    { teacher_name: 'T1-4', max: 92 }
  ],
  'class 2': [
    { teacher_name: 'T2-1', max: 48 },
    { teacher_name: 'T2-2', max: 80 },
    { teacher_name: 'T2-3', max: 92 },
    { teacher_name: 'T2-4', max: 97 }
  ]}
  
  student_wish
  b06901099: {
    'class 1': [ 'T1-3', 'T1-4', 'T1-2', 'T1-1' ],
    'class 2': [ 'T2-1', 'T2-4', 'T2-3', 'T2-2' ],
    'class 3': [ 'T3-3', 'T3-4', 'T3-1', 'T3-2' ],
    'class 4': [ 'T4-1', 'T4-3', 'T4-4', 'T4-2' ],
    'class 5': [ 'T5-3', 'T5-1', 'T5-2', 'T5-4' ],
    'class 6': [ 'T6-2', 'T6-4', 'T6-1', 'T6-3' ],
    'class 7': [ 'T7-2', 'T7-4', 'T7-3', 'T7-1' ],
    'class 8': [ 'T8-1', 'T8-2', 'T8-3', 'T8-4' ],
    'class 9': [ 'T9-2', 'T9-3', 'T9-4', 'T9-1' ],
    'class 10': [ 'T10-2', 'T10-1', 'T10-3', 'T10-4' ],
    'class 11': [ 'T11-4', 'T11-2', 'T11-1', 'T11-3' ],
    'class 12': [ 'T12-4', 'T12-2', 'T12-1', 'T12-3' ]
  }
 */
function to_courses() {
  let course_names = Object.keys(courses_info);
  //console.log(course_names);
  let coursegroups = course_names.map((course, index) => ({
    name: course,
    grade: (index % 4) + 1,
    _id: new mongoose.Types.ObjectId(),
    courses: []
  }));
  /**
   * coursegroup:
     * {
        name: 'class 9',
        grade: 1,
        _id: 5d1752749c3a3631c828cdd7,
        courses: []
        }
     */
  const reducer = (accumulator, curarray) => {
    //console.log(accumulator,curarray);
    return [...accumulator, ...curarray];
  };
  let courses = coursegroups.map((coursegroup, coursegroupindex) => {
    let teachers = courses_info[coursegroup.name].map(course => {
      let this_id = new mongoose.Types.ObjectId();
      //also add id to coursegroup.courses
      coursegroups[coursegroupindex].courses.push(this_id);
      return {
        _id: this_id,
        id: Buffer.from(coursegroup.name + course.teacher_name).toString(
          'base64'
        ),
        name: coursegroup.name,
        limit: course.max,
        group: coursegroup._id,
        teacher: course.teacher_name
      };
    });
    return teachers;
  });
  courses = courses.reduce(reducer);
  //console.log(courses);
  //console.log(coursegroups);
  return { coursegroups, courses };
}

const { coursegroups, courses } = to_courses();

function to_Wish() {
  let Wish = [];
  for (student in student_wishes) {
    for (course in student_wishes[student]) {
      Wish.push({
        _id: new mongoose.Types.ObjectId(),
        students_ids: [student],
        course_name: course,
        priority: student_wishes[student][course]
      });
    }
  }
  return Wish;
}
const wishes = to_Wish();
//console.log(wishes);
console.log(coursegroups);
//console.log(courses,coursegroups,wishes);
async function insert_to_db(){
    await Course.remove();
    await CourseGroup.remove();
    await Wish.remove();
    console.log('removed');
    try{
        await Course.insertMany(courses);
        await CourseGroup.insertMany(coursegroups);
        await Wish.insertMany(wishes);
    }
    catch(e){
        console.log(e.message);
    }
    console.log('added');
}
function connect_to_db() {
  mongoose.connect(
    'mongodb://test:debug1@ds231207.mlab.com:31207/course_test',
    {
      useNewUrlParser: true,
      useCreateIndex: true // Avoid node DeprecationWarning
    }
  );
  mongoose.connection.once('open', () => {
    console.log('Successfully connected to MongoDB');
    //insert_to_db();
  });
}
connect_to_db();
//console.log(coursegroups,courses);

//console.log(courses);
//console.log(random_testcase2(courses));
