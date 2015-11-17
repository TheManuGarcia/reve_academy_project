/**
 * Created by Lauren on 11/16/15.
 */
app.controller('ViewDataInternController', function ($http) {

    var viewdata = this;
    viewdata.showCharts = false;

    viewdata.getData = function () {
        // remove existing charts before appending new charts
        $('#charts').empty();
        $('.chart1Table').find("tr:gt(0)").remove();
        $('.chart2Table').find("tr:gt(0)").remove();
        $('.chart3Table').find("tr:gt(0)").remove();
        $('.chart4Table').find("tr:gt(0)").remove();
        viewdata.showCharts = true;
        $http.get('/getOneIntern').then(function (data) {
            console.log(data.data);
            viewdata.internData = data.data;
            viewdata.internChart(data.data);
        });
    };

    viewdata.internChart = function (data) {

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
            pointDotRadius: 5,
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
                    console.log("Not working boss!");
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
        } else {
            $("#ChartLI0").remove();
        }

        if (Object.keys(chartDataArray[1]).length) {
            var myChart1 = new Chart(chartCtxArray[1]).Line(dataEnthusiasm, chartOptions);
        } else {
            $("#ChartLI1").remove();
        }

        if (Object.keys(chartDataArray[2]).length) {
            var myChart2 = new Chart(chartCtxArray[2]).Line(dataTeamwork, chartOptions);
        } else {
            $("#ChartLI2").remove();
        }

        if (Object.keys(chartDataArray[3]).length) {
            var myChart3 = new Chart(chartCtxArray[3]).Line(dataProblemSolving, chartOptions);
        } else {
            $("#ChartLI3").remove();
        }

        if (Object.keys(chartDataArray[4]).length) {
            var myChart4 = new Chart(chartCtxArray[4]).Line(dataProfessionalism, chartOptions);
        } else {
            $("#ChartLI4").remove();
        }

        // tables

        var j = 5;
        var tableNumber = 1;
        var noData = false;

        while (j <= 8) {
            if (Object.keys(chartDataArray[j]).length) {
                i = 0;
                while (chartDataArray[j].labels[i]) {
                    $(".chart" + tableNumber + "Table").append("<tr><td>" + chartDataArray[j].labels[i] + "</td><td>" + chartDataArray[j].datasets[0].data[i] + "</td></tr>");
                    i++;
                }
            } else {
                //console.log('got here');
                $("#ChartLI" + j).remove();

                if (noData == false) {
                    $(".aclass").append("<p class='noDataText'>There is no data</p>")
                    noData = true;
                }
            }
            j++;
            tableNumber++;
        }
    }
});