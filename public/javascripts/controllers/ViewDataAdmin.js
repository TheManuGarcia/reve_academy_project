app.controller('ViewDataAdminController', function($http) {
    console.log("ViewDataAdmin Controller");

    var viewdata = this;
    viewdata.teacherSelected = false;
    viewdata.classSelected = false;
    viewdata.studentSelected = false;


    $http.get('/getTeachers').then(function(data) {
        //console.log(data.data);
        viewdata.teachers = data.data;
    });

    viewdata.selectTeacher = function(UserID) {
        viewdata.teacherSelected = true;
        //console.log(UserID);
        $http.get('/getClasses/' + UserID).then(function(data2) {
            //console.log(data2.data);
            viewdata.classes = data2.data;
        });
    };

    viewdata.selectClass = function(ClassID) {
        viewdata.classSelected = true;
        //console.log(ClassID);
        $http.get('/getStudents/' + ClassID).then(function(data3) {
            //console.log(data3.data);
            viewdata.students = data3.data;
        });
    };

    viewdata.selectStudent = function(StudentID) {
        viewdata.studentSelected = true;
        //console.log(StudentID);
        $http.get('/getStudentData/' + StudentID).then(function(data4) {
            console.log(data4.data);
            viewdata.studentData = data4.data;
            viewdata.studentChart(data4.data);

        });
    };

    viewdata.studentChart = function(data) {

        var dataEquitable = {};
        var dataCommunication = {};
        var dataEnthusiasm = {};
        var dataTeamwork = {};
        var dataProblemSolving = {};
        var dataProfessionalism = {};
        var dataEngagement = {};
        var dataSupportiveLearning = {};
        var dataResponsibility = {};

        var fillColor = "rgba(209,68,20,0.2)";
        var strokeColor = "rgba(220,220,220,1)";
        var pointColor = "rgba(209,68,20,1)";
        var pointStrokeColor = "#fff";
        var pointHighlightFill = "#fff";
        var pointHighlightStroke = "rgba(220,220,220,1)";

        function buildObject(dataObject, dataToPush) {

            if (!dataObject.labels) dataObject.labels = [];

            dataObject.labels.push(moment.unix(dataToPush.DateCreated).format("MM/DD/YYYY"));
            //dataObject.labels.push(dataToPush.DateCreated);

            if (!dataObject.datasets) {
                dataObject.datasets = [];

                dataObject.datasets.push({
                    label: dataToPush.ObsType,
                    fillColor: fillColor,
                    strokeColor: strokeColor,
                    pointColor: pointColor,
                    pointStrokeColor: pointStrokeColor,
                    pointHighlightFill: pointHighlightFill,
                    pointHighlightStroke: pointHighlightStroke
                });
            }

            if (!dataObject.datasets[0].data) dataObject.datasets[0].data = [];

            dataObject.datasets[0].data.push(dataToPush.ObsValue);

        }

        //console.log()
        var i = 0;
        while (i < data.length) {
            //console.log(data[i]);
            switch (data[i].ObsType) {
                case "Equitable":
                    buildObject(dataEquitable, data[i]);
                    break;
                case "Communication":
                    buildObject(dataCommunication, data[i]);
                    break;
                case "Enthusiasm":
                    buildObject(dataEnthusiasm, data[i]);
                    break;
                case "Teamwork":
                    buildObject(dataTeamwork, data[i]);
                    break;
                case "ProblemSolving":
                    buildObject(dataProblemSolving, data[i]);
                    break;
                case "Professionalism":
                    buildObject(dataProfessionalism, data[i]);
                    break;
                case "Engagement":
                    buildObject(dataEngagement, data[i]);
                    break;
                case "SupportiveLearning":
                    buildObject(dataSupportiveLearning, data[i]);
                    break;
                case "Responsibility":
                    buildObject(dataResponsibility, data[i]);
                    break;
                default:
                    console.log("Not working boss!");
            }

            i++;
        }

        var chartDataArray = [dataEquitable, dataCommunication, dataEnthusiasm, dataTeamwork, dataProblemSolving,
            dataProfessionalism, dataEngagement, dataSupportiveLearning, dataResponsibility];

        var chartObjectArray = [];
        var chartCtxArray = [];
        var chartOptions = {
            pointDotRadius : 6,
            scaleOverride: true,
            scaleSteps: 5,
            scaleStepWidth: 1,
            scaleStartValue: 0
        };









        var title = "No Chart";
        for (var k = 0; k < chartDataArray.length; k++) {
            if (Object.keys(chartDataArray[k]).length) {
                title = chartDataArray[k].datasets[0].label;
            } else {
                title = "No Chart";
            }
            $("#charts").append(title + "<canvas id='Chart" + k + "' width='400' height='256'></canvas>");




        }

        console.log(Object.keys(dataProblemSolving).length);
        //console.log(dataProblemSolving);
        var chart0 = $("#Chart0").get(0).getContext("2d");
        var chart1 = $("#Chart1").get(0).getContext("2d");
        var chart2 = $("#Chart2").get(0).getContext("2d");
        var chart3 = $("#Chart3").get(0).getContext("2d");
        var chart4 = $("#Chart4").get(0).getContext("2d");
        var chart5 = $("#Chart5").get(0).getContext("2d");
        var chart6 = $("#Chart6").get(0).getContext("2d");
        var chart7 = $("#Chart7").get(0).getContext("2d");
        var chart8 = $("#Chart8").get(0).getContext("2d");

        var myChart0 = new Chart(chart0).Line(dataEquitable, chartOptions);
        var myChart1 = new Chart(chart1).Line(dataCommunication, chartOptions);
        var myChart2 = new Chart(chart2).Line(dataEnthusiasm, chartOptions);
        var myChart3 = new Chart(chart3).Line(dataTeamwork, chartOptions);
        var myChart4 = new Chart(chart4).Line(dataProblemSolving, chartOptions);
        var myChart5 = new Chart(chart5).Line(dataProfessionalism, chartOptions);
        var myChart6 = new Chart(chart6).Line(dataEngagement, chartOptions);
        var myChart7 = new Chart(chart7).Line(dataSupportiveLearning, chartOptions);
        var myChart8 = new Chart(chart8).Line(dataResponsibility, chartOptions);










        // var title = "";
       //for (var k = 0; k < chartDataArray.length; k++) {
       //  if (Object.keys(chartDataArray[k]).length) {
       //      title = chartDataArray[k].datasets[0].label;
       //
       //      $("#charts").append(title + "<canvas id='Chart" + k + "' width='400' height='256'></canvas><br>");
       //
       //      chartCtxArray.push($("#Chart" + k).get(0).getContext("2d"));
       //      console.log(chartCtxArray);
       //      chartObjectArray.push(new Chart(chartCtxArray[k].Line(chartDataArray[k]), chartOptions));
       //  }
       //
       //}
       //
       // //console.log(Object.keys(dataProblemSolving).length);
       // ////console.log(dataProblemSolving);
       // var chart0 = $("#Chart0").get(0).getContext("2d");
       // var chart1 = $("#Chart1").get(0).getContext("2d");
       // var chart2 = $("#Chart2").get(0).getContext("2d");
       // var chart3 = $("#Chart3").get(0).getContext("2d");
       // var chart4 = $("#Chart4").get(0).getContext("2d");
       // var chart5 = $("#Chart5").get(0).getContext("2d");
       // var chart6 = $("#Chart6").get(0).getContext("2d");
       // var chart7 = $("#Chart7").get(0).getContext("2d");
       // var chart8 = $("#Chart8").get(0).getContext("2d");
       //
       // var myChart0 = new Chart(chart0).Line(dataEquitable, chartOptions);
       // var myChart1 = new Chart(chart1).Line(dataCommunication, chartOptions);
       // var myChart2 = new Chart(chart2).Line(dataEnthusiasm, chartOptions);
       // var myChart3 = new Chart(chart3).Line(dataTeamwork, chartOptions);
       // var myChart4 = new Chart(chart4).Line(dataProblemSolving, chartOptions);
       // var myChart5 = new Chart(chart5).Line(dataProfessionalism, chartOptions);
       // var myChart6 = new Chart(chart6).Line(dataEngagement, chartOptions);
       // var myChart7 = new Chart(chart7).Line(dataSupportiveLearning, chartOptions);
       // var myChart8 = new Chart(chart8).Line(dataResponsibility, chartOptions);

    }

});