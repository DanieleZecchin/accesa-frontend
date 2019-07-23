console.log('custom javascript loaded');

$(function() {

    // Login validation error
    if ($('#login_main_content .messagingSection-Error').is(':visible')) {
      $('.cc_login_form').addClass('validation-error');
    }

});
