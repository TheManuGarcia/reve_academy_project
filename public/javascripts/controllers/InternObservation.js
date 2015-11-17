/**
 * Created by Lauren on 11/13/15.
 */
app.controller('InternObservationController', function ($http) {

    var observation = this;
    observation.internClicked = false;
    observation.obsSaved = false;
    observation.message = "Your observation was saved.";

    observation.showButtonProgress = function() {
        if (observation.obsSaved) return false;
        if (!observation.obsSaved && observation.internClicked) return true;
    };

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
        observation.obsSaved = false;
        observation.internSelected = intern;
        console.log("Intern selected = " + observation.internSelected);
        resetSliders();
    };

    observation.formData = [];

    //////////////////////////////////
    //    SAVE OBSERVATION          //
    /////////////////////////////////

    observation.saveObs = function (ObsType) {

        for (var i = 0; i < observation.internData.length; i++) {
            var temp = {};
            temp.BeingObservedID = observation.internData[i].UserID;
            temp.ObsType = ObsType;
            temp.ObsValue = observation.internData[i].ObsValue;
            if (observation.internData[i].ObsValue || observation.internData[i].ObsValue == false) observation.formData.push(temp);

        }
        if (observation.formData.length) {
            observation.obsSaved = true;
            console.log(observation.obsSaved);
            observation.message = "Your observation was saved.";
            console.log(observation.formData);
            return $http.post('/addInternObs', observation.formData).then(function () {
                observation.formData = [];
            });
        }
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
        observation.sliderData.BeingObservedID = parseInt(observation.internSelected.UserID);
        if (parseInt(observation.sliderCommunication) != 0)observation.sliderData.Communication = parseInt(observation.sliderCommunication);
        if (parseInt(observation.sliderEnthusiasm) != 0)observation.sliderData.Enthusiasm = parseInt(observation.sliderEnthusiasm);
        if (parseInt(observation.sliderTeamwork) != 0)observation.sliderData.Teamwork = parseInt(observation.sliderTeamwork);
        if (parseInt(observation.sliderProblemSolving) != 0)observation.sliderData.ProblemSolving = parseInt(observation.sliderProblemSolving);
        if (parseInt(observation.sliderProfessionalism) != 0)observation.sliderData.Professionalism = parseInt(observation.sliderProfessionalism);

        console.log(observation.sliderData);
        observation.obsSaved = true;
        observation.message = "Your observation was saved.";
        return $http.post('/addInternObsSlider', observation.sliderData).then(function() {
            observation.sliderData = {};
        });
    }

});