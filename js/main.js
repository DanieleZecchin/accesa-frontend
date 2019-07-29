console.log('custom javascript loaded');

$(function() {



    // Login validation error
    if ($('#login_main_content .messagingSection-Error').is(':visible')) {
        $('.cc_login_form').addClass('validation-error');

    }

    // Forgot password page - check valid email
    if ($('.cc_forgot_password_panel').length) {
        $('.cc_forgot_password_panel input[type=text]').on('keyup', function() {
            checkEmailOnForgotPasswordPage();
        });

        checkEmailOnForgotPasswordPage();
    }

    // Necessary function to manipulate the DOM after Ajax refreshes
    // function manipulateDomAfterAjax() {
    //     setInterval(function() {
    //         console.log('Checks after AJAX call');

    //         // Hide Account in Top Navbar if not logged in
    //         if ($('body').find('a.goToLogin.cc_goto_login').length) {
    //             $('li.cc_my_account').hide();
    //         }

    //         // Realtime check of phone and mobile inputs
    //         $('#myAccountForm').on('keyup', 'input[name*="mobile"], input[name*="Phone"]', function() {
    //             var $this = $(this);
    //             $this.val(sanitizedPhoneNumber($this.val() + ''));
    //         });

    //         createNewUserForm();

    //     }, 1000);
    //}

    // manipulateDomAfterAjax();
    setupAJAXChecker();

});

// $(window).on('load', createNewUserForm);

// function createNewUserForm() {
//     if($('#createAccountMod').length > 0) {
//         console.log('Page: create new user');
//     }
// }

function checkEmailOnForgotPasswordPage() {
    if ( ! isValidEmail($('.cc_forgot_password_panel input[type=text]').val() + ''))
        $('.cc_forgot_password_panel input[type=submit]').prop('disabled', true);
    else
        $('.cc_forgot_password_panel input[type=submit]').prop('disabled', false);
}

/**
 * @param {string} email
 */
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


/**
 * @param {string} phone
 */
function sanitizedPhoneNumber(phone) {
    var plusSign = phone.charAt(0) == '+' ? '+' : '';
    return (plusSign + (phone.replace(/[^0-9,]/g, '')));
}

function setupAJAXChecker() {
    console.log('setupAJAXChecker');
    var mainContainer = document.querySelector('.acctmainSection');
    if (mainContainer == null) {
        throw 'Element .acctmainSection is not present';
    }
    var observerOptions = {
        childList: true,
        attributes: false,
        subtree: false,
    };
    var observer = new MutationObserver(setupAndCleanupAfterAjax);
    observer.observe(mainContainer, observerOptions);
}

/**
 * @callback MutationCallBack
 * @param {MutationRecord[]} mutations
 * @param {MutationObserver} observer
 * @returns {void}

 * @type {MutationCallBack}
 */
function setupAndCleanupAfterAjax(mutationList, observer) {
    console.log('Account main section has been modified');
    // console.log({ mutationList, observer });
    removeUserEditForm();
    hideAccountLinkInTopNavbarIfNotLoggedIn();
    sanitizePhoneAndMobileInputFieldsContinuously();
}

function hideAccountLinkInTopNavbarIfNotLoggedIn() {
    if ($('body a.goToLogin.cc_goto_login').length > 0) {
        $('li.cc_my_account').hide();
    }
}

function sanitizePhoneAndMobileInputFieldsContinuously() {
    $('#myAccountForm input[name*="mobile"], input[name*="Phone"]').on('keyup', function() {
        console.log(this);
        var $this = $(this);
        $this.val(sanitizedPhoneNumber($this.val() + ''));
    });
}

function removeUserEditForm() {
    $('#EditAccountMod').remove();
}