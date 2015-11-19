$(function() {

    // confirm/verify password and email before registration
    $('#passwordSubmitButton').prop('disabled', true);

    function checkConfirm(field1, field2, type) {
        field1 = $(field1).val();
        field2 = $(field2).val();
        if ((field1 != field2) || (field1 == "") || (field2 == "")) {
            $("#registerMessage").text(type + ' do not match').css("color", "#F00");
            $('#passwordSubmitButton').prop('disabled', true);
        } else {
            $("#registerMessage").text(type + ' OK').css("color", "#090");
            $('#passwordSubmitButton').prop('disabled', false);
        }
    }

    $("#password").keyup(function () {
        if ($("#password").val().length < 6) {
            $("#registerMessage").text('Passwords must be at least six (6) characters').css("color", "#F00");
        } else {
            checkConfirm("#password", "#confirmPassword", "Passwords ");
        }
    });
    $('#confirmPassword').keyup(function () {
        checkConfirm("#password", "#confirmPassword", "Passwords");
    });

    $("#password").change(function () {
        if ($("#password").val().length < 6) {
            $("#registerMessage").text('Passwords must be at least six (6) characters').css("color", "#F00");
        } else {
            checkConfirm("#password", "#confirmPassword", "Passwords ");
        }
    });
    $('#confirmPassword').change(function () {
        checkConfirm("#password", "#confirmPassword", "Passwords ");
    });

    $("#email").keyup(function () {
        checkConfirm("#email", "#confirmEmail", "Emails ");
    });
    $('#confirmEmail').keyup(function () {
        checkConfirm("#email", "#confirmEmail", "Emails ");
    });
    $("#email").change(function () {
        checkConfirm("#email", "#confirmEmail", "Emails ");
    });
    $('#confirmEmail').change(function () {
        checkConfirm("#email", "#confirmEmail", "Emails ");
    });

});