$(document).ready(function(){
    event.preventDefault();

    $('.button-collapse').sideNav({
            menuWidth: 240, // Default is 240
            edge: 'left', // Choose the horizontal origin
            closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
        }
    );

    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 // Creates a dropdown of 15 years to control year
    });

    // select box for add intern
    $('select').material_select();

    //adds collapsible navbar functionality
    $(".button-collapse").sideNav();



});

