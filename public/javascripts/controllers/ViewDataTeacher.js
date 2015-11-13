app.controller('ViewDataTeacherController', function($http) {
    console.log("ViewDataTeacher Controller");

    var viewdata = this;
    viewdata.teacherSelected = false;
    viewdata.classSelected = false;

    $http.get('/getTeachers').then(function(data) {
        console.log(data.data);
        viewdata.teachers = data.data;
    });

    viewdata.selectTeacher = function(UserID) {
        viewdata.teacherSelected = true;
        console.log(UserID);
        $http.get('/getClasses/' + UserID).then(function(data2) {
            console.log(data2.data);
            viewdata.classes = data2.data;
        });
    };

    viewdata.selectClass = function(ClassID) {
        viewdata.classSelected = true;
        console.log(ClassID);
        $http.get('/getStudents/' + ClassID).then(function(data3) {
            console.log(data3.data);
            viewdata.students = data3.data;
        });
    };

});