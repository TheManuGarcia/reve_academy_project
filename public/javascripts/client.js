/**
 * Created by Lauren on 11/5/15.
 */
$(document).ready(function(){
    event.preventDefault();

    $('.button-collapse').sideNav({
            menuWidth: 240, // Default is 240
            edge: 'left', // Choose the horizontal origin
            closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
        }
    );

});