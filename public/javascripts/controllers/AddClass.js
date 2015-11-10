app.controller('AddClassController', ['$http', function ($http) {
    console.log("AddClass Controller");

    var addClass = this;

    addClass.submit = function () {
        var newClass = {};

        newClass.ClassName = addClass.ClassName;
        newClass.DateStart = document.getElementById("DateStart").value;
        newClass.DateStart = Date.parse(newClass.DateStart + " 12:00:00") / 1000;

        console.log("newClass = ", newClass);

        $http.post('/add_class', newClass).then(function () {
            window.location = "/add_student";
        });
    };

}]);