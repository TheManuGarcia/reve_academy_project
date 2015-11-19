app.controller('AddStudentController', function ($http) {
    console.log("AddStudent Controller");


    var student = this;

    // get all classes associated with this teacher

    $http.get('/getClasses').then(function (data) {
        console.log(data.data);
        student.Classes = data.data;
    });
    student.classSelected = "";
    student.classClicked = false;

    student.selectClass = function (selectedClass) {
        console.log(selectedClass.ClassID);
        student.classClicked = true;
        student.classSelected = selectedClass.ClassName;
        student.getStudents(selectedClass.ClassID);

    };

    student.getStudents = function (classID) {

        $http.get('/getStudents/' + classID).then(function (data) {
            console.log(data);
            student.classData = data.data;
        });
    };

    student.addStudent = function (student, classID) {
        var newStudent = {
            FirstName: student.FirstName,
            LastName: student.LastName,
            ClassID: classID
        };
        console.log(newStudent);
        $(".addStudentForm").trigger("reset");
        $(".FirstName").focus();
        return $http.post('/addStudent', newStudent).then(student.getStudents(classID));
    };

});