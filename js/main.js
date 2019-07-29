console.log('custom javascript loaded');

$(function() {

    // Login validation error
    if ($('#login_main_content .messagingSection-Error').is(':visible')) {
        $('.cc_login_form').addClass('validation-error');
    }

    // Forgot password page - check valid email
    if ($('.cc_forgot_password_panel').length) {
        $('.cc_forgot_password_panel input[type=text]').on('keyup', function() {
            checkEmail();
        });

        checkEmail();
    }

    // Necessary function to manipulate the DOM after Ajax refreshes
    function manipulateDomAfterAjax() {
        setInterval(function() {
            
            // Hide Account in Top Navbar if not logged in
            if ($('body').find('a.goToLogin.cc_goto_login').length) {
                $('li.cc_my_account').hide();
            }

            // Realtime check of phone and mobile inputs
            $('#myAccountForm').on('keyup', 'input[name*="mobile"], input[name*="Phone"]', function() {
                sanitizePhone($(this));
            });

        }, 1000);
    }

    manipulateDomAfterAjax();
});

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function checkEmail() {
    if (!isValidEmail($('.cc_forgot_password_panel input[type=text]').val()))
        $('.cc_forgot_password_panel input[type=submit]').prop('disabled', true);
    else
        $('.cc_forgot_password_panel input[type=submit]').prop('disabled', false);
}

function sanitizePhone(phone) {
    var plusSign = phone.val().charAt(0) == '+' ? '+' : '';
    phone.val(plusSign + (phone.val().replace(/[^0-9,]/g, '')));
}
