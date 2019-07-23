console.log('custom javascript loaded');

$(function() {

    // Login validation error
    if ($('#login_main_content .messagingSection-Error').is(':visible')) {
      $('.cc_login_form').addClass('validation-error');
    }

    // Forgot password page - check valid email
    if ($('.cc_forgot_password_panel').length) {

      $('.cc_forgot_password_panel input[type="text"]').on('keyup', function() {

        if (!isValidEmail($('.cc_forgot_password_panel input[type=text]').val()))
          $('.cc_forgot_password_panel input[type=submit]').prop('disabled', true);
        else
          $('.cc_forgot_password_panel input[type=submit]').prop('disabled', false);
      });
    }

});

function isValidEmail(email)
{
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}