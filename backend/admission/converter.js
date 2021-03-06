/*
  type Wish {
    _id: ID!
    student_ids: [String!]
    course_name: String!
    priority: [String!]
  }
    wish: 
    {學號：｛
        第一門課：［志願序］
        第二門課：［志願序］
    ｝}
    group_info:
        ｛
            第一門課: [[學生1,學生2,學生3]]
            第二門課: [[學生1,學生2,學生3]]
        ｝
*/
let test_wish = [
    {student_ids:['b03902001'],course_name:'class 1', priority:['T1-1','T1-3','T1-2']},
    {student_ids:['b03902001'],course_name:'class 3-group', priority:['T3-1']},
    {student_ids:['b03902002','b03902003'],course_name:'class 3-group', priority:['T3-1']},
    {student_ids:['b03902004','b03902005','b03902006'],course_name:'class 3-group', priority:['T3-1']},
    {student_ids:['b03902007','b03902008'],course_name:'class 3-group', priority:['T3-1']},
    {student_ids:['b03902009'],course_name:'class 3-group', priority:['T3-1']},
];
/*
  type Course {
    _id: ID!
    name: String!
    limit: Int!
    group: CourseGroup
    teacher: String!
  }
  type CourseGroup {
    _id: ID!
    courses: [Course!]!
    name: String!
    grade: Int!
  }
*/
let test_course = [
    {name: "class 1", limit: 10, group: {grade: 3}, teacher: 'T1-1'},
    {name: "class 1", limit: 50, group: {grade: 3}, teacher: 'T1-2'},
    {name: "class 1", limit: 100, group: {grade: 3}, teacher: 'T1-3'},

    {name: "class 2", limit: 10, group: {grade: 3}, teacher: 'T2-1'},
    {name: "class 2", limit: 50, group: {grade: 3}, teacher: 'T2-2'},
    {name: "class 2", limit: 110, group: {grade: 3}, teacher: 'T2-3'},
    
    {name: "class 3-group", limit: 20, group: {grade: 4}, teacher: 'T3-1'},
    {name: "class 3-group", limit: 50, group: {grade: 4}, teacher: 'T3-2'},
    {name: "class 3-group", limit: 110, group: {grade: 4}, teacher: 'T3-3'},
];
//  expect : {
//     "class 1":
//         [ 
//             {teacher_name : 'T1-1', max: 10},
//             {teacher_name : 'T1-2', max: 50},
//             {teacher_name : 'T1-3', max: 1000},
//         ],
//     "class 2":
//         [ 
//             {teacher_name : 'T2-1', max: 10},
//             {teacher_name : 'T2-2', max: 50},
//             {teacher_name : 'T2-3', max: 110},
//         ],
//     "class 3-group":
//         [ 
//             {teacher_name : 'T3-1', max: 20,  group: true},
//             {teacher_name : 'T3-2', max: 50,  group: true},
//             {teacher_name : 'T3-3', max: 110, group: true},
//         ]
// };
const test = require('./test_generator');

function wish_db2backend(before,class_info){
    let after = {};
    let group_info = {}
    before.forEach(wish => {
        wish['student_ids'].forEach((student_id) => {
            if (!(student_id in after))
                after[student_id] = {};
        });
        if(class_info[wish['course_name']][0]['group']){        
            // if is group class
            if(!(wish['course_name'] in group_info))
                group_info[wish['course_name']] = [];
            
            wish['student_ids'].forEach((student_id) => {
                after[student_id][wish['course_name']] = wish['priority'];

            });
            group_info[wish['course_name']].push(wish['student_ids']);

        }else{
            // normal class
            after[wish['student_ids'][0]][wish['course_name']] = wish['priority'];
        }
    });
    return [after, group_info];
}
function class_info_db2backend(before){
    let after = {}
    before.forEach((course)=>{
    // course format :{name: "class 1", limit: 50, group: {grade: 3}, teacher: 'T1-2'},

        // not in -> initialization
        if (!(course['name'] in after))
            after[course['name']] = []
        after[course['name']].push(
            {
                teacher_name: course['teacher'],
                max: course['limit'],
                // check if group exists.
                group: course['group'] && course['group']['grade'] == 4 ? true : false
            }
        );
    });
    return after;
}
/*
    const CourseCommentSchema = new mongoose.Schema({
        _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
        semester: { type: String, required: true },
        type: { type: String, required: true }, //必修、選修、十選二
        name: { type: String, required: true },
        domain: { type: String }, //CS、光電...
        teacher: { type: String, required: true },
        studyTogether: { type: String },
        studyBefore: { type: String },
        content: [{ type: String }],
        score: Number,
        author: String
    });


  class_info:{
        第一門課：［{name: --, max: --, group: true/false} ］,
    }
*/
/*
let class_info = class_info_db2backend(test_course);
console.log("===");
console.log(class_info);

let [wishs , group_info] = wish_db2backend(test_wish,class_info);
console.log("===");
console.log(wishs);

console.log("===");
console.log(group_info);
*/
exports.class_info_db2backend = class_info_db2backend;
exports.wish_db2backend = wish_db2backend;


// 