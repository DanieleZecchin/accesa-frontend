console.log('custom javascript loaded');

// Login validation error
if ($('#login_main_content .messagingSection-Error').length > 0) {
  $('.cc_login_form').addClass('validation-error');
}