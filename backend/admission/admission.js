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
            第一門課：［{Name: --, Max: --} ］,
        }
output 1:
    ｛第一門課：｛
    老師一:［學生］
    老師二: [], 
    +第二門課：｛｝｝
output 2:
    {學號：｛
        wish + ' ' + 第一門課：［志願序］
        wish + ' ' + 第二門課：［志願序］
        第一門課 : 被分發到的老師,
        第二門課 : 被分發到的老師 (nobe if empty)
    ｝}
*/

// Random from normal distribution with std & mean
// reference : https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve
function randn(mean,std) {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    num = num * std + mean; // Translate to 0 -> 1
    return num;
}

// random generate testcase with input format mentioned.
function random_testcase(class_info){
    function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
    test_data = {}
    for(let year=3; year<=6; year++){
        for(let number=1; number<=100; number++){
            let school_number = "b0" + year + "901" + String(number).padStart(3,"0");
            test_data[school_number] = {};
            for(let key in class_info){
                test_data[school_number][key] = shuffle(class_info[key].map((e)=>(e['teacher_name'])));
            }
        }
    }
    return test_data
}
// random_testcase but with someone not choose the class or order is not completed.
function random_testcase2(class_info){
    function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
    test_data = {}
    for(let year=3; year<=6; year++){
        for(let number=1; number<=100; number++){
            let school_number = "b0" + year + "901" + String(number).padStart(3,"0");
            test_data[school_number] = {};
            for(let key in class_info){
                if(Math.random() > 0.1){
                    test_data[school_number][key] = shuffle(class_info[key].map((e)=>(e['teacher_name'])));
                    if(Math.random() < 0.1){
                        test_data[school_number][key] = test_data[school_number][key].slice(0,2);
                    }
                
                }
            }
        }
    }
    return test_data
}

function admission(wish_ref,class_info){
    // copy to a new object.
    let wish = Object.assign({}, wish_ref);

    // get each student's random generator.
    let visited = {}
    // visited, or has been selected: {number:{class: True/False}}
    for( let school_number in wish ){
        wish[school_number]["__generator__"] = 
        school_number[2] == '3' ? ()=>randn(0.8,0.05) :
        school_number[2] == '4' ? ()=>randn(0.7,0.085) :
        school_number[2] == '5' ? ()=>randn(0.6,0.09) :
        school_number[2] == '6' ? ()=>randn(0.5,0.12) : undefined;

        visited[school_number] = {}
        for( let class_name in class_info){
            visited[school_number][class_name] = false;
        }
    }
    // Per class / stu init
    let per_class = {};
    let per_stu = {};
    
    for( let class_name in class_info){
        // Initial per_class[classname][teacher]
        per_class[class_name] = {}
        for( let teach_info_idx in class_info[class_name]){
            per_class[class_name][class_info[class_name][teach_info_idx]['teacher_name']] = []
        }

        // Per wish
        for( let wish_order = 0 ; wish_order < 3 ; wish_order ++){
            
            // Join student[wish_order] == this class & teacher and (not OK) to competitors
            class_info[class_name].forEach(({ teacher_name, max }) => {
                let competitors = [];
                for( let school_number in wish ){
                    // if stu select this class & if not chosen & if wish match this teacher
                    if( class_name in wish[school_number] &&
                        !visited[school_number][class_name] &&
                        wish[school_number][class_name][wish_order] == teacher_name
                    ){
                        // push priority & student
                        competitors.push( [wish[school_number]['__generator__'](),school_number] );
                    }
                };
                // sort with priority
                competitors.sort((a,b) => (b[0]-a[0]));
                // choose selected students
                let selected = competitors.slice(0,max-per_class[class_name][teacher_name].length);
                // add to per_class
                per_class[class_name][teacher_name].push(...selected.map((elem)=>(elem[1])));

                // set to visit & set the chosen class name in wish
                selected.forEach((elem)=>{
                    visited[elem[1]][class_name] = true;
                    if(!(elem[1] in per_stu))
                        per_stu[elem[1]] = {};
                    per_stu[elem[1]][class_name] = teacher_name;
                });
                
                
            });
        }

    }
    // patch: add "nobe" in per_stu[school_number][class_name] & add poor students that all fail.
    for( let school_number in wish ){
        for( let class_name in wish[school_number]){
            if(!(school_number in per_stu))
                per_stu[school_number] = {}
            if(Array.isArray(wish[school_number][class_name])){
                if(!(class_name in per_stu[school_number]))
                    per_stu[school_number][class_name] = 'nobe';
                per_stu[school_number]['wish ' + class_name] = wish[school_number][class_name];
            }
        }
    }
    // data  = { {num:{course_name:[teacher_list] } } }
    return [per_class, per_stu];
}
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
        ]
};

let wish = random_testcase2(class_info);
let [per_class_result, per_stu_result] = admission(wish,class_info);
const ordered = {};
Object.keys(per_stu_result).sort().forEach(function(key) {
  ordered[key] = per_stu_result[key];
});
per_stu_result = ordered;


// Testing Output
console.log(per_stu_result);
console.log(per_class_result['class 1']['T1-1']);