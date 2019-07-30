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

    setupAllCheckers();

});



// $(window).on('load', createNewUserForm);

// function manageNewUserForm() {
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

function setupAllCheckers() {
    var findNavbarContainer = () => document.querySelector('ul.navbar-nav.cc_list-inline');
    var findMainContainer = () => document.querySelector('.acctmainSection');

    console.log('o1:', setupChecker({
        waitFor: findNavbarContainer,
        thenWatch: navbarContainer,
        onChangeCall: topNavBarChangedCallback,
    }));
    console.log('o2:', setupChecker({
        onChanged: mainContainer,
        do: setupAndCleanup,
    }));
    console.log('observers created');
}

/** @typedef {{ onChanged: Element | null, do: Callback }} BehaviorOnChange */
/** @typedef {{ waitFor: ElementFinder, thenWatch: ElementFinder, onChangeCall: Callback }} Checker */
/** @typedef {{ function(): Element | Null }} ElementFinder */
/** @typedef {function(): void} Callback */
/** @typedef {{ childList: boolean, attributes: boolean, subtree: boolean }} ObserverOptions */
/**
 * @type {Checker}
 */
function setupChecker({  waitFor: findContainer, thenWatch: findTrigger, onChangeCall: callback  }) {

    if (target != null) {
        console.log('observe', target.outerHTML);
        return createObserver(target, callback);
    } else {
        return null;
    }
}

/**
 *
 * @param {Element} target
 * @param {Callback} callback
 */
function createObserver(target, callback) {
    var observerOptions = {
        childList: true,
        attributes: false,
        subtree: false,
    };
    var observer = new MutationObserver(callback);
    observer.observe(target, observerOptions);
    return observer;
}

/*
function setupAJAXChecker() {
    console.log('setupAJAXChecker');
    if (mainContainer == null) {
        setupAndCleanup();
        return;
    }
    var observerOptions = {
        childList: true,
        attributes: false,
        subtree: false,
    };
    var observer = new MutationObserver(function () {
        setTimeout(setupAndCleanup, 200);
    });
    observer.observe(mainContainer, observerOptions);
}
*/

function topNavBarChangedCallback() {
    console.log('top-navbar callback');
    hideAccountLinkInTopNavbarIfNotLoggedIn();
}

function setupAndCleanup() {
    console.log('Account main section has been modified');
    // console.log({ mutationList, observer });
    removeUserEditForm();
    sanitizePhoneAndMobileInputFieldsContinuously();
}

function hideAccountLinkInTopNavbarIfNotLoggedIn() {
    console.log('hideAccount');
    console.log($('.cc_goto_login'));
    if ($('.cc_goto_login').length > 0) {
        console.log('removing account link');
        $('li.cc_my_account').hide();
    }
}

function sanitizePhoneAndMobileInputFieldsContinuously() {
    $('input[type="tel"]').on('keyup', function() {
        console.log(this);
        var $this = $(this);
        $this.val(sanitizedPhoneNumber($this.val() + ''));
    });
}

function removeUserEditForm() {
    console.log('removing user edit form');
    document.querySelectorAll('#EditAccountMod').forEach(el => el.remove());
}