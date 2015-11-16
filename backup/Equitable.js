app.controller('EquitableController', function($http) {
    console.log("Equitable Controller");

    var equitable = this;
    equitable.obsSaved = false;


    $http.get('/getClasses').then(function (data) {
        //console.log(data.data);
        equitable.Classes = data.data;
    });
    equitable.classSelected = "";
    equitable.classClicked = false;

    equitable.selectClass = function (selectedClass) {
        //console.log(selectedClass.ClassID);
        equitable.classClicked = true;
        equitable.classSelected = selectedClass.ClassName;
        equitable.getStudents(selectedClass.ClassID);

    };

    equitable.getStudents = function (classID) {

        $http.get('/getStudents/' + classID).then(function (data) {
            //console.log("students = ", data);
            equitable.studentData = data.data;
        });
    };


    equitable.formData = [];

    equitable.saveObs = function () {

        for(var i =0; i < equitable.studentData.length; i++){
            var temp = {};
            temp.StudentID = equitable.studentData[i].StudentID;
            temp.ObsType = "Equitable";
            temp.ObsValue = equitable.studentData[i].ObsValue;
            if(equitable.studentData[i].ObsValue) equitable.formData.push(temp);

        }
        if(equitable.formData.length) {
            equitable.obsSaved = true;
            equitable.message = "Your observation was saved.";
            console.log(equitable.formData);
            $("#equitableButton").prop('disabled', true).remove();
        }
        return $http.post('/addObs', equitable.formData).then(function () { });

    }

});