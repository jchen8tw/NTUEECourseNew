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



exports.random_testcase = random_testcase;
exports.random_testcase2 = random_testcase2;
