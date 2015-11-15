app.controller('AddTeacherController', ["$http", function($http) {
    console.log("AddTeacher Controller");

    var teacher = this;
    teacher.submit = function() {
        var newTeacher = {
            first_name: teacher.first_name,
            last_name: teacher.last_name,
            school: teacher.school,
            startdate: teacher.startdate
        };
        console.log("Submit form with ", newTeacher);

        $http({
            method: 'POST',
            url: '/add_teacher',
            data: newTeacher
        }).then(function (response) {
            console.log(response);
        });

    };



}]);