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
*/
const test = require('./test_generator');

function wish_db2backend(before){
    after = {};
    before.forEach(wish => {
        if (!(wish['student_ids'] in after))
            after[wish['student_ids']] = {};
        after[wish['student_ids']][wish['course_name']] = wish['priority'];
    });
    return after;
}
function wish_backend2db(before){
    after = [];
    for(let student_id in before){
        for(let class_name in before[student_id]){
            after.push({
                student_ids: student_id,
                course_name: class_name,
                priority: before[student_id][class_name]
            });
        }
    }
    return after;
}

let class_info = {
    "class 1":
        [ 
            {teacher_name : 'T1-1', max: 10},
            {teacher_name : 'T1-2', max: 50},
            {teacher_name : 'T1-3', max: 1000},
        ],
    "class 2":
        [ 
            {teacher_name : 'T2-1', max: 10},
            {teacher_name : 'T2-2', max: 50},
            {teacher_name : 'T2-3', max: 110},
        ],
    "class 3-group":
        [ 
            {teacher_name : 'T3-1', max: 20,  group: true},
            {teacher_name : 'T3-2', max: 50,  group: true},
            {teacher_name : 'T3-3', max: 110, group: true},
        ]
};
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

  class_info:{
        第一門課：［{name: --, max: --, group: true/false} ］,
    }
*/

let [wish, group_info] = test.random_testcase3(class_info);
console.log(wish);
let db_wishs = wish_backend2db(wish);
// console.log(db_wishs);
let rev_wishs = wish_db2backend(db_wishs);
console.log("===");
console.log(rev_wishs);

// 