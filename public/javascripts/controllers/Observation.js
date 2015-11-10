app.controller('ObservationController', function($http) {
    console.log("Observation Controller");

    var observation = this;
    observation.obsSaved = false;
    //
    //console.log($(':checkbox').prop('checked'));

    $http.get('/getClasses').then(function (data) {
        //console.log(data.data);
        observation.Classes = data.data;
    });
    observation.classSelected = "";
    observation.classClicked = false;

    observation.selectClass = function (selectedClass) {
        //console.log(selectedClass.ClassID);
        observation.classClicked = true;
        observation.classSelected = selectedClass.ClassName;
        observation.getStudents(selectedClass.ClassID);

    };

    observation.getStudents = function (classID) {

        $http.get('/getStudents/' + classID).then(function (data) {
            //console.log("students = ", data);
            observation.studentData = data.data;
            //$('.respo').prop('checked', true);
        });
    };


    observation.formData = [];

    observation.saveObs = function (ObsType) {

        for(var i =0; i < observation.studentData.length; i++){
            var temp = {};
            temp.StudentID = observation.studentData[i].StudentID;
            temp.ObsType = ObsType;
            temp.ObsValue = observation.studentData[i].ObsValue;
            if(observation.studentData[i].ObsValue || observation.studentData[i].ObsValue == false) observation.formData.push(temp);

        }
        if(observation.formData.length) {
            observation.obsSaved = true;
            observation.message = "Your observation was saved.";
            console.log(observation.formData);
            $("#observationButton").prop('disabled', true).remove();
        }
        return $http.post('/addObs', observation.formData).then(function () { });

    }

});