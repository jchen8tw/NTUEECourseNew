import json
data = json.load(open('result.json','r'))
class_info = {
    "class 1":
        [ 
            {"teacher_name" : 'T1-1', "max": 10},
            {"teacher_name" : 'T1-2', "max": 50},
            {"teacher_name" : 'T1-3', "max": 1000},
        ],
    "class 2":
        [ 
            {"teacher_name" : 'T2-1', "max": 10},
            {"teacher_name" : 'T2-2', "max": 50},
            {"teacher_name" : 'T2-3', "max": 110},
        ]
}
statistics = {
    "class 1": {
        'T1-1': [0,0,0,0],
        'T1-2': [0,0,0,0],
        'T1-3': [0,0,0,0],
    },"class 2": {
        'T2-1': [0,0,0,0],
        'T2-2': [0,0,0,0],
        'T2-3': [0,0,0,0],
    }
}
for school_number in data:
    stu_info = data[school_number]
    year = int(school_number[2])
    # statistics
    for class_name in stu_info:
        if stu_info[class_name] != 'nobe' and 'wish' not in class_name:
            statistics[class_name][stu_info[class_name]][year-3] += 1

# print(year)  
print(statistics)

# print(data)