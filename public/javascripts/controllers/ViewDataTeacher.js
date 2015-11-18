app.controller('ViewDataTeacherController', function($http) {

    var viewdata = this;
    viewdata.classSelected = false;
    viewdata.studentSelected = false;
    viewdata.showCharts = false;
    viewdata.classAverage = false;
    var pageData = false;
    $("#dataMessage").hide();

    function clearCharts() {
        console.log('clear charts');
        $('#charts').empty();
        $('.chart1Table').find("tr:gt(0)").remove();
        $('.chart2Table').find("tr:gt(0)").remove();
        $('.chart3Table').find("tr:gt(0)").remove();
        $('.chart4Table').find("tr:gt(0)").remove();
    }

    $http.get('/getClasses/').then(function(data2) {
        //console.log(data2.data);
        viewdata.classes = data2.data;
    });

    viewdata.selectClass = function(Class) {
        $("#dataMessage").hide();
        pageData = false;
        viewdata.classSelected = true;
        ClassID = Class.ClassID;
        viewdata.className = Class.ClassName;
        viewdata.dateStart = moment.unix(Class.DateStart).format("M/DD/YYYY");
        viewdata.showCharts = false;
        clearCharts();
        //console.log(ClassID);
        $http.get('/getStudents/' + ClassID).then(function(data3) {
            //console.log(data3.data);
            viewdata.students = data3.data;
        });
    };

    viewdata.selectStudent = function(Student) {
        clearCharts();
        $("#dataMessage").hide();
        pageData = false;
        viewdata.studentSelected = true;
        viewdata.classAverage = false;
        viewdata.showCharts = false;
        StudentID = Student.StudentID;
        viewdata.studentName = Student.FirstName + " " + Student.LastName;
    };

    viewdata.getClassAverage = function() {
        clearCharts();
        viewdata.showCharts = false;
        viewdata.classAverage = true;
        viewdata.studentSelected = false;
    };

    viewdata.getData = function() {
        pageData = false;
        // remove existing charts before appending new charts
        clearCharts();
        viewdata.showCharts = true;

        if (viewdata.studentSelected) {
            viewdata.classAverage = false;
            console.log('StudentID = ', StudentID);
            $http.get('/getStudentData/' + StudentID).then(function (data4) {
                console.log(data4.data);
                viewdata.studentChart(data4.data);
            });
        }

        if (viewdata.classAverage) {
            viewdata.chartData = [];

            function flatten(array) {
                i = 0;
                while (i < array.length) {
                    viewdata.chartData.push(array[i]);
                    i++;
                }
            }

            $http.get('/getClassAverages/' + ClassID + '/' + 'Communication').then(function (data) {
                flatten(data.data);
                $http.get('/getClassAverages/' + ClassID + '/' + 'Enthusiasm').then(function (data) {
                    flatten(data.data);
                    $http.get('/getClassAverages/' + ClassID + '/' + 'Teamwork').then(function (data) {
                        flatten(data.data);
                        $http.get('/getClassAverages/' + ClassID + '/' + 'Problem%20Solving').then(function (data) {
                            flatten(data.data);
                            $http.get('/getClassAverages/' + ClassID + '/' + 'Professionalism').then(function (data) {
                                flatten(data.data);
                                console.log(viewdata.chartData);
                                viewdata.studentChart(viewdata.chartData);
                            });

                        });

                    });

                });

            });

        }

    };

    viewdata.studentChart = function(data) {

        console.log("class = " + viewdata.classAverage);
        console.log("student = " + viewdata.studentSelected);

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
            if (viewdata.classAverage) dataObject.labels.push(dataToPush.Date);
            if (viewdata.studentSelected) dataObject.labels.push(moment.unix(dataToPush.DateCreated).format("M/DD/YYYY"));

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

            if (viewdata.classAverage) dataObject.datasets[0].data.push(dataToPush.Average);
            if (viewdata.studentSelected) dataObject.datasets[0].data.push(dataToPush.ObsValue);
        }

        var i = 0;
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
                    console.log("Not working boss!");
            }

            i++;
        }

        var chartDataArray = [];
        chartDataArray = [dataCommunication, dataEnthusiasm, dataTeamwork, dataProblemSolving,
            dataProfessionalism, dataEquitable, dataEngagement, dataSupportiveLearning, dataResponsibility];
        console.log(chartDataArray);

        var chartCtxArray = [];

        var chartTitle = "";
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
            if (Object.keys(chartDataArray[j]).length) {
                //$(".aclass").remove();
                i = 0;
                $("#ChartLI" + j).show();

                while(chartDataArray[j].labels[i]) {
                    $(".chart" + tableNumber + "Table").append("<tr><td>" + chartDataArray[j].labels[i] + "</td><td>" + chartDataArray[j].datasets[0].data[i] + "</td></tr>");
                    i++;
                }
                pageData = true;
            } else {
                //console.log('got here');
                $("#ChartLI" + j).hide();
            }
            j++;
            tableNumber++;
        }

        // show message if no data found for submitted user
        if (pageData == false) $("#dataMessage").show();

    }

});