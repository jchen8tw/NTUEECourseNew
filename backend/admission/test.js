const admission = require('./admission').admission;
const test = require('./test_generator');


/*
B06-B03各100人
每個人有三個志願（也就是三個老師）
每個人要選兩門課

input:
    wish: 
        {學號：｛
        第一門課：［志願序］
        第二門課：［志願序］
        ｝}

    class_info:
        {
            第一門課：［{name: --, max: --, group: true/false} ］,
        }
    
    group_info:
        ｛
            第一門課： [[學生1,學生2,學生3]]
            第二門課:  [[學生1,學生2,學生3]]
        ｝

    output 1 (per_class_result):
    ｛
        第一門課：｛
            老師一: ［學生］
            老師二: [...], 
        第二門課：｛｝
    ｝

output 2 (per_stu_result):
    {學號：｛
        wish + ' ' + 第一門課：［志願序］
        wish + ' ' + 第二門課：［志願序］
        第一門課 : 被分發到的老師,
        第二門課 : 被分發到的老師 (nobe if empty)
    ｝}
*/

// This is the example class info.
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

let [wish, group_info] = test.random_testcase3(class_info);
console.log(group_info['class 3-group']);
console.log("=====");
let [per_class_result, per_stu_result] = admission(wish,class_info,group_info);
const ordered = {};
Object.keys(per_stu_result).sort().forEach(function(key) {
  ordered[key] = per_stu_result[key];
});
per_stu_result = ordered;

console.log(per_class_result);
// Testing Output
// console.log(per_stu_result);
// console.log(per_class_result['class 1']['T1-1']);

var fs = require('fs');
var stream = fs.createWriteStream("result.json");
stream.once('open', function(fd) {
  stream.write(JSON.stringify(per_stu_result));
  stream.end();
});