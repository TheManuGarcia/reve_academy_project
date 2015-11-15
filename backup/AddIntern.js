app.controller('AddInternController', ["$http", function($http) {
    console.log("AddIntern Controller");
    var intern = this;

    intern.submit = function() {

        var newIntern = {
            first_name: intern.first_name,
            Internship: intern.Internship,
            startdate: intern.startdate
        };
        console.log("New intern is: ", newIntern);
    }

}]);
