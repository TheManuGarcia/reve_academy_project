app.controller('AdminController', function($http) {

    var admin = this;

    admin.getClasses = function() {
        $http.get('/getClasses').then(function(data) {
            //console.log(data.data);
            admin.classes = data.data;
        });
    };

    admin.getTeachers = function() {
        $http.get('/getTeachers').then(function(data) {
            //console.log(data.data);
            $('.modal-backdrop').remove();
            admin.teachers = data.data;
        });
   };

    admin.getInterns = function() {
        $http.get('/getInterns').then(function(data) {
            //console.log(data.data);
            $('.modal-backdrop').remove();
            admin.interns = data.data;
        });
    };

    admin.getAuthCodes = function() {
        $http.get('/getAuthCodes').then(function(data) {
            admin.InternCode = data.data[0].InternCode;
            admin.TeacherCode = data.data[0].TeacherCode;
            admin.AdminCode = data.data[0].AdminCode;
        });
    };

    admin.setAuthCodes = function() {
        if (!admin.InternCode || !admin.TeacherCode || !admin.AdminCode) {
            admin.saveMessage = "";
            admin.errorMessage = "ERROR: codes must be exactly five (5) characters in length.";
        } else {
            if (admin.InternCode.toString().length != 5 || admin.TeacherCode.toString().length != 5 || admin.AdminCode.toString().length != 5) {
                admin.saveMessage = "";
                admin.errorMessage = "ERROR: codes must be exactly five (5) characters in length.";
            } else {
                admin.errorMessage = "";
                admin.saveMessage = "Login codes saved.";
                var codes = {
                    InternCode: parseInt(admin.InternCode),
                    TeacherCode: parseInt(admin.TeacherCode),
                    AdminCode: parseInt(admin.AdminCode)
                };
                return $http.post('/setAuthCodes', codes);
            }
        }
    };

    admin.initModals = function() {
        $('.modal-trigger').leanModal({
                dismissible: false, // Modal can be dismissed by clicking outside of the modal
                opacity: .5, // Opacity of modal background
                in_duration: 0, // Transition in duration
                out_duration: 0, // Transition out duration
                complete: function() {  }
            }
        );
    };

    admin.deleteUser = function(Type, UserID) {
        var userToDelete = { UserID : UserID };
        return $http.post('/deleteUser', userToDelete).then(function() {
            // attempt to remove modal backdrop after deletion
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-open');
            if (Type == "Teacher") {
                admin.getTeachers();
            }
            if (Type == "Intern") {
                admin.getInterns();
            }

            // reload window if Firefox - unable to remove modal
            var pattern = /Firefox/g;
            var result = pattern.test(navigator.userAgent);
            if (result) {
                window.location="/admin";
            }
        });
    };

    // get initial data after page has loaded
    admin.getClasses();
    admin.getTeachers();
    admin.getInterns();
    admin.getAuthCodes();

});

// make directive to run after ng-repeat is done -- in this case, it applies the modal triggers to each button
app.directive('repeatDone', function() {
    return function(scope, element, attrs) {
        if (scope.$last) { // run directive after last item rendered
            scope.$eval(attrs.repeatDone);
        }
    }
});