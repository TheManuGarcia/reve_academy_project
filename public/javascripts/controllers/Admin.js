app.controller('AdminController', function($http) {

    var admin = this;

    admin.message = "Admin controller";

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
    console.log(navigator.userAgent);

    admin.deleteUser = function(Type, UserID) {
        var userToDelete = { UserID : UserID };
        return $http.post('/deleteUser', userToDelete).then(function() {
            // remove backdrop from modal after deletion
            //if (Type == "Teacher") $('#modalTeacher' + UserID).modal('hide');
            //if (Type == "Intern") $('#modalIntern' + UserID).modal('hide');
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-open');
            if (Type == "Teacher") {
                admin.getTeachers();
            }
            if (Type == "Intern") {
                admin.getInterns();
            }

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

});

// make directive to run after ng-repeat is done -- in this case, it applies the modal triggers to each button
app.directive('repeatDone', function() {
    return function(scope, element, attrs) {
        if (scope.$last) { // run directive after last item rendered
            scope.$eval(attrs.repeatDone);
        }
    }
});