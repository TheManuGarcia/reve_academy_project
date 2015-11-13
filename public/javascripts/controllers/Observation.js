app.controller('ObservationController', function($http) {
    console.log("Observation Controller");

    var observation = this;
    observation.classSelected = "";
    observation.classClicked = false;
    observation.studentClicked = false;
    observation.obsSaved = false;

    $http.get('/getClasses').then(function (data) {
        observation.Classes = data.data;
    });

    observation.selectClass = function (selectedClass) {
        observation.classClicked = true;
        observation.classSelected = selectedClass.ClassName;
        observation.getStudents(selectedClass.ClassID);

    };

    observation.getStudents = function (classID) {

        $http.get('/getStudents/' + classID).then(function (data) {
            observation.studentData = data.data;
        });
    };

    observation.selectStudent = function (student){
        observation.studentClicked = true;
        observation.studentSelected = student;
        resetSliders();
    };

    observation.formData = [];

    observation.saveObs = function (ObsType) {

        for(var i = 0; i < observation.studentData.length; i++){
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

    };

    /////////////////////// SLIDER FORM ///////////////////////

    function resetSliders() {
        observation.sliderCommunication = 0;
        observation.sliderEnthusiasm = 0;
        observation.sliderTeamwork = 0;
        observation.sliderProblemSolving = 0;
        observation.sliderProfessionalism = 0;
    }

    observation.sliderData = {};

    observation.saveSliderObs = function() {
        observation.sliderData.StudentID = parseInt(observation.studentSelected.StudentID);
        if(parseInt(observation.sliderCommunication) !=0)observation.sliderData.Communication = parseInt(observation.sliderCommunication);
        if(parseInt(observation.sliderEnthusiasm) !=0)observation.sliderData.Enthusiasm = parseInt(observation.sliderEnthusiasm);
        if(parseInt(observation.sliderTeamwork) !=0)observation.sliderData.Teamwork = parseInt(observation.sliderTeamwork);
        if(parseInt(observation.sliderProblemSolving) !=0)observation.sliderData.ProblemSolving = parseInt(observation.sliderProblemSolving);
        if(parseInt(observation.sliderProfessionalism) !=0)observation.sliderData.Professionalism = parseInt(observation.sliderProfessionalism);

        //console.log(observation.sliderData);
        observation.obsSaved = true;
        observation.message = "Your observation was saved.";
        $("#progressButton").prop('disabled', true).remove();
        return $http.post('/addObsSlider', observation.sliderData);
    }

});