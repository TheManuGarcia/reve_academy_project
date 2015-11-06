$(document).ready(function(){
    $('#getDatabtn').on('click', function(){

    var ctx = $("#mycanvas").get(0).getContext("2d");
    var data = [
        //values will be generated according to the evaluations

        {
            value: 270,
            color: "cornflowerblue",
            highlight:"steelblue",
            label:"Enthusiasm"
        },

        {
            value: 120,
            color: "lightgreen",
            highlight:"yellowgreen",
            label:"Professionalism"
        },

        {
            value: 90,
            color: "firebrick",
            highlight:"indigo",
            label:"Team Work"
        },

        {
            value: 50,
            color: "palevioletred",
            highlight:"darkorange",
            label:"Problem Solving"
        },

        {
            value: 30,
            color: "lightslategray",
            highlight:"olivedrab",
            label:"Communication"
        }
    ];

    var chart = new Chart(ctx).Doughnut(data);

    });
});
