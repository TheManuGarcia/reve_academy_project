app.controller('ViewDataAdminController', function($http) {

    var viewdata = this;
    viewdata.teacherSelected = false;
    viewdata.classSelected = false;
    viewdata.studentSelected = false;
    viewdata.showCharts = false;
    viewdata.internSelected = false;
    viewdata.foundClasses = false;
    viewdata.teacherMessage = "";
    var pageData = false;
    $("#dataMessageAdmin").hide();


    $http.get('/getTeachers').then(function(data) {
        //console.log(data.data);
        viewdata.teachers = data.data;
        $http.get('/getInterns').then(function(dataInterns) {
           viewdata.interns = dataInterns.data;
        });
    });

    viewdata.showButton = function(button) {
        if (viewdata.internSelected) return false;
        if (button == "classButton" && viewdata.teacherSelected) return true;
        if (button == "studentButton" && viewdata.teacherSelected && viewdata.classSelected) return true;
    };

    // select a teacher and get that teacher's classes
    var UserID;
    viewdata.selectTeacher = function(Teacher) {
        $("#dataMessageAdmin").hide();
        pageData = false;
        clearCharts();
        viewdata.showCharts = false;
        viewdata.internSelected = false;
        viewdata.teacherSelected = true;
        viewdata.classSelected = false;
        viewdata.foundClasses = false;
        viewdata.studentSelected = false;
        UserID = Teacher.UserID;
        viewdata.name = Teacher.FirstName + " " + Teacher.LastName;
        //console.log(UserID);
        $http.get('/getClasses/' + UserID).then(function(data2) {
            //console.log(data2.data);
            viewdata.classes = [];
            viewdata.classes = data2.data;
            if (viewdata.classes.length) {
                viewdata.foundClasses = true;
            } else {
                viewdata.teacherMessage = "(no classes found)";
            }
        });
    };

    var BeingObservedID;
    viewdata.selectIntern = function(Intern) {
        viewdata.internSelected = true;
        viewdata.teacherSelected = true;
        viewdata.classSelected = false;
        viewdata.studentSelected = false;
        viewdata.name = Intern.FirstName + " " + Intern.LastName;
        //console.log(Intern);
        BeingObservedID = Intern.UserID;
        viewdata.showCharts = false;
        clearCharts();
    };

    function clearCharts() {
        $('#charts').empty();
        $('.chart1Table').find("tr:gt(0)").remove();
        $('.chart2Table').find("tr:gt(0)").remove();
        $('.chart3Table').find("tr:gt(0)").remove();
        $('.chart4Table').find("tr:gt(0)").remove();
    }

    var ClassID;
    viewdata.selectClass = function(Class) {
        $("#dataMessageAdmin").hide();
        pageData = false;
        clearCharts();
        viewdata.showCharts = false;
        viewdata.classSelected = true;
        viewdata.studentSelected = false;
        ClassID = Class.ClassID;
        viewdata.className = Class.ClassName;
        viewdata.dateStart = moment.unix(Class.DateStart).format("M/DD/YYYY");
        //console.log(ClassID);
        $http.get('/getStudents/' + ClassID).then(function(data3) {
            //console.log(data3.data);
            viewdata.students = data3.data;
        });
    };

    var StudentID;
    viewdata.selectStudent = function(Student) {
        $("#dataMessageAdmin").hide();
        pageData = false;
        clearCharts();
        viewdata.studentSelected = true;
        viewdata.showCharts = false;
        StudentID = Student.StudentID;
        viewdata.studentName = Student.FirstName + " " + Student.LastName;
    };

    viewdata.getData = function() {
        pageData = false;
        clearCharts();
        // remove existing charts before appending new charts
        viewdata.showCharts = true;
        if (viewdata.studentSelected) {
            $http.get('/getStudentData/' + StudentID).then(function (data4) {
                //console.log(data4.data);
                viewdata.studentChart(data4.data);
            });
        }
        if (viewdata.internSelected) {
            $http.get('/getInternData/' + BeingObservedID).then(function (data4) {
                //console.log(data4.data);
                viewdata.studentChart(data4.data);
            });
        }
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
        var pointColor = "rgba(209,68,20,0.6)";
        var pointStrokeColor = "#fff";
        var pointHighlightFill = "rgba(209,68,20,1)";
        var pointHighlightStroke = "rgba(220,220,220,1)";

        var chartOptions = {
            pointDotRadius : 5,
            scaleOverride: true,
            scaleSteps: 6,
            scaleStepWidth: 1,
            scaleStartValue: 0,
            scaleFontFamily: "'Roboto', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            tooltipFontFamily: "'Roboto', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            tooltipFillColor: "rgba(112,115,114,1)",
            tooltipXPadding: 10,
            tooltipYPadding: 10,
            responsive: false
        };

        function buildObject(dataObject, dataToPush) {

            if (!dataObject.labels) dataObject.labels = [];

            // push formatted observation date to object
            dataObject.labels.push(moment.unix(dataToPush.DateCreated).format("M/DD/YYYY"));
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

        i = 0;
        while (i < data.length) {
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
                case "Problem Solving":
                    buildObject(dataProblemSolving, data[i]);
                    break;
                case "Professionalism":
                    buildObject(dataProfessionalism, data[i]);
                    break;
                case "Engagement":
                    buildObject(dataEngagement, data[i]);
                    break;
                case "Supportive Learning":
                    buildObject(dataSupportiveLearning, data[i]);
                    break;
                case "Responsibility":
                    buildObject(dataResponsibility, data[i]);
                    break;
                default:
                    console.log("Not working boss! " + data[i].ObsType);
            }

            i++;
        }

        var chartDataArray = [dataCommunication, dataEnthusiasm, dataTeamwork, dataProblemSolving,
            dataProfessionalism, dataEquitable, dataEngagement, dataSupportiveLearning, dataResponsibility];

        var chartCtxArray = [];

        var chartTitle;
        //for (var x = 0; x < chartDataArray.length; x++) {
        for (var x = 0; x <= 4; x++) {
            if (Object.keys(chartDataArray[x]).length) {
                chartTitle = chartDataArray[x].datasets[0].label;
            } else {
                chartTitle = "";
            }
            $("#charts").append("<li id='ChartLI" + x + "'><h3>" + chartTitle + "</h3><canvas id='Chart" + x + "' width='400' height='256'></canvas></li>");
            chartCtxArray.push($("#Chart" + x).get(0).getContext("2d"));
        }

        // charts

        if (Object.keys(chartDataArray[0]).length) {
            var myChart0 = new Chart(chartCtxArray[0]).Line(dataCommunication, chartOptions);
            pageData = true;
        } else {
            $("#ChartLI0").remove();
        }

        if (Object.keys(chartDataArray[1]).length) {
            var myChart1 = new Chart(chartCtxArray[1]).Line(dataEnthusiasm, chartOptions);
            pageData = true;
        } else {
            $("#ChartLI1").remove();
        }

        if (Object.keys(chartDataArray[2]).length) {
            var myChart2 = new Chart(chartCtxArray[2]).Line(dataTeamwork, chartOptions);
            pageData = true;
        } else {
            $("#ChartLI2").remove();
        }

        if (Object.keys(chartDataArray[3]).length) {
            var myChart3 = new Chart(chartCtxArray[3]).Line(dataProblemSolving, chartOptions);
            pageData = true;
        } else {
            $("#ChartLI3").remove();
        }

        if (Object.keys(chartDataArray[4]).length) {
            var myChart4 = new Chart(chartCtxArray[4]).Line(dataProfessionalism, chartOptions);
            pageData = true;
        } else {
            $("#ChartLI4").remove();
        }

        // tables

        var j = 5;
        var tableNumber = 1;

        while (j <= 8) {
            // show data table if data exists in current dataArray index
            if (Object.keys(chartDataArray[j]).length) {
                i = 0;
                $("#ChartLI" + j).show();
                while(chartDataArray[j].labels[i]) {
                    $(".chart" + tableNumber + "Table").append("<tr><td>" + chartDataArray[j].labels[i] + "</td><td>" + chartDataArray[j].datasets[0].data[i] + "</td></tr>");
                    i++;
                }
                pageData = true;
            } else {
                // hide table if no data found
                $("#ChartLI" + j).hide();
            }
            j++;
            tableNumber++;
        }

        // show message if no data found for submitted user
        if (pageData == false) {
            $("#dataMessageAdmin").show();
        }

    }

});