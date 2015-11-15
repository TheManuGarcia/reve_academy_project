$(document).ready(function(){
    //event.preventDefault();

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

    // modal for delete confirm
    //$('.modal-trigger').leanModal();

    $('.modal-trigger').leanModal({
            dismissible: false, // Modal can be dismissed by clicking outside of the modal
            opacity: .5, // Opacity of modal background
            in_duration: 0, // Transition in duration
            out_duration: 0 // Transition out duration
            //ready: function() { alert('Ready'); }, // Callback for Modal open
            //complete: function() { alert('Closed'); } // Callback for Modal close
        }
    );

});

