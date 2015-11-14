/**
 * Created by Lauren on 11/13/15.
 */
app.controller('InternObservationController', function ($http) {
    console.log("Intern Observation Controller");


    var observation = this;
    observation.internClicked = false;
    observation.obsSaved = false;

    //////////////////////////////////
    //    GET INTERNS               //
    /////////////////////////////////

    $http.get('/getInterns').then(function (data) {
        console.log(data);
        observation.internData = data.data;
        console.log(observation.internData);
    });


    //////////////////////////////////
    //    SELECT INTERN             //
    /////////////////////////////////

    observation.selectIntern = function (intern) {
        console.log(intern);
        observation.internClicked = true;
        observation.internSelected = intern;
        console.log("Intern selected = " + observation.internSelected);
        resetSliders();
    };

    observation.formData = [];

    //TODO I think this needs to be changed to using UserID, because there is no InternID

    //////////////////////////////////
    //    SAVE OBSERVATION          //
    /////////////////////////////////

    observation.saveObs = function (ObsType) {

        for (var i = 0; i < observation.internData.length; i++) {
            var temp = {};
            temp.UserID = observation.internData[i].UserID;
            temp.ObsType = ObsType;
            temp.ObsValue = observation.internData[i].ObsValue;
            if (observation.internData[i].ObsValue || observation.internData[i].ObsValue == false) observation.formData.push(temp);

        }
        if (observation.formData.length) {
            observation.obsSaved = true;
            observation.message = "Your observation was saved.";
            console.log(observation.formData);
            $("#observationButton").prop('disabled', true).remove();
        }
        return $http.post('/addInternObs', observation.formData).then(function () {
        });

    };

    //////////////////////////////////
    //    SLIDER FORM              //
    /////////////////////////////////
    function resetSliders() {
        observation.sliderCommunication = 0;
        observation.sliderEnthusiasm = 0;
        observation.sliderTeamwork = 0;
        observation.sliderProblemSolving = 0;
        observation.sliderProfessionalism = 0;
    }

    //////////////////////////////////
    //    SAVE SLIDER OBSERVATION   //
    /////////////////////////////////

    observation.sliderData = {};

    observation.saveSliderObs = function () {
        observation.sliderData.UserID = parseInt(observation.internSelected.UserID);
        if (parseInt(observation.sliderCommunication) != 0)observation.sliderData.Communication = parseInt(observation.sliderCommunication);
        if (parseInt(observation.sliderEnthusiasm) != 0)observation.sliderData.Enthusiasm = parseInt(observation.sliderEnthusiasm);
        if (parseInt(observation.sliderTeamwork) != 0)observation.sliderData.Teamwork = parseInt(observation.sliderTeamwork);
        if (parseInt(observation.sliderProblemSolving) != 0)observation.sliderData.ProblemSolving = parseInt(observation.sliderProblemSolving);
        if (parseInt(observation.sliderProfessionalism) != 0)observation.sliderData.Professionalism = parseInt(observation.sliderProfessionalism);

        //console.log(observation.sliderData);
        observation.obsSaved = true;
        observation.message = "Your observation was saved.";
        $("#progressButton").prop('disabled', true).remove();
        return $http.post('/addInternObsSlider', observation.sliderData);
    }

});