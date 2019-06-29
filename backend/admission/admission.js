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
function admission(wish_ref,class_info,pre_group_info){
    // copy to a new object.
    let wish = Object.assign({}, wish_ref);

    // pre_group_info -> group_info
    /*
        pre_group_info:
        ｛
            第一門課: [[學生1,學生2,學生3]]
            第二門課: [[學生1,學生2,學生3]]
        ｝

        group_info -> ｛
        第一門課：｛
            學生1: [學生1,學生2,學生3]
            學生2: [學生1,學生2,學生3]
            學生3: [學生1,學生2,學生3]
            學生4: [學生4,學生5,學生6]
            學生5: [學生4,學生5,學生6]
            學生6: [學生4,學生5,學生6]
        ｝
    */
    let group_info = {};
    for(let class_name in pre_group_info){
        if(class_info[class_name][0]['group']){        
            group_info[class_name] = {}
            pre_group_info[class_name].forEach((group_members) => {
                group_members.forEach((each_members)=>{
                    group_info[class_name][each_members] = group_members;
                });
            });
        }
   }
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
    // pre : "fake" admit. (only group)
    let pre_per_class = {};
    let per_class = {};
    let per_stu = {};
    
    for( let class_name in class_info){
        // Initial per_class[classname][teacher]
        per_class[class_name] = {}
        pre_per_class[class_name] = {}
        for( let teach_info_idx in class_info[class_name]){
            per_class[class_name][class_info[class_name][teach_info_idx]['teacher_name']] = []
            pre_per_class[class_name][class_info[class_name][teach_info_idx]['teacher_name']] = []
        }

        // Per wish
        for( let wish_order = 0 ; wish_order < 10 ; wish_order ++){
            
            // Join student[wish_order] == this class & teacher and (not OK) to competitors
            class_info[class_name].forEach(({ teacher_name, max, group }) => {
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
                for(let i = 0; i<competitors.length ; i++){
                    let now_chosen_student = competitors[i][1];
                    // add to pre_per_class
                    if(group){
                        // if is group -> add to pre_per_class
                        pre_per_class[class_name][teacher_name].push(now_chosen_student);
                        group_members = group_info[class_name][now_chosen_student]
                        // if all memebers in pre_per, all members are passed.
                        let is_ok = true;
                        group_members.forEach((each_member) => {
                            // a member not in pre_per or visited
                            if(!pre_per_class[class_name][teacher_name].includes(each_member) ||
                                visited[now_chosen_student][class_name]){
                                is_ok = false;
                            }
                        });
                        // check quota exceed after added.
                        if(is_ok && group_members.length + per_class[class_name][teacher_name].length <= max ){
                            // push all to per_class
                            per_class[class_name][teacher_name].push(...group_members);
                            visited[now_chosen_student][class_name] = true;
                        }
                    }else{
                        per_class[class_name][teacher_name].push(now_chosen_student);
                        if(!(now_chosen_student in per_stu))
                            per_stu[now_chosen_student] = {};
                        per_stu[now_chosen_student][class_name] = teacher_name;
                        visited[now_chosen_student][class_name] = true;
                    }
        
                }
                
                
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

exports.admission = admission;
