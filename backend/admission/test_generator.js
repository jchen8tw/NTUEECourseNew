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
    return [test_data, undefined]
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
            let school_number = "B0" + year + "901" + String(number).padStart(3,"0");
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
    return [test_data, undefined]
}
// random_testcase2 but with group.
function random_testcase3(class_info){
    function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
    test_data = {}
    for(let year=3; year<=6; year++){
        for(let number=1; number<=10; number++){
            let school_number = "b0" + year + "901" + String(number).padStart(3,"0");
            test_data[school_number] = {};
            for(let now_class_info in class_info){
                test_data[school_number][now_class_info] = shuffle(class_info[now_class_info].map((e)=>(e['teacher_name'])));
            }
        }
    }
    group_info = {}
    for(let now_class_info in class_info){
        group_info[now_class_info] = {}
        class_info[now_class_info].forEach(each_class_info => {
            if(each_class_info['group']){
                let shuffle_student = shuffle(Object.keys(test_data));
                let group_list = [];
                for(let i=0 ; i != shuffle_student.length ; ){
                    let now_group_length = Math.random() * 3  + 1;
                    if( i + now_group_length > shuffle_student.length)
                        now_group_length = shuffle_student.length - i;
                    group_list.push(shuffle_student.slice(i,i+now_group_length));
                    i = i + now_group_length;
                }
                group_info[now_class_info] = group_list;
            }
        });
    }

    return [test_data, group_info];
}



exports.random_testcase = random_testcase;
exports.random_testcase2 = random_testcase2;
exports.random_testcase3 = random_testcase3;
