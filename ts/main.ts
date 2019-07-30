console.log('custom javascript loaded');

type Callback = () => void;
type ElementFinder = () => Element | null;


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

function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitizedPhoneNumber(phone: string) {
    var plusSign = phone.charAt(0) == '+' ? '+' : '';
    return (plusSign + (phone.replace(/[^0-9,]/g, '')));
}

function setupAllCheckers() {
    var findNavbarContainer = () => document.querySelector('ul.navbar-nav.cc_list-inline');
    var findMainContainer = () => document.querySelector('.acctmainSection');

    setupChecker(
        findNavbarContainer,
        findNavbarContainer,
        topNavBarChangedCallback
    );
    setupChecker(
        findMainContainer,
        findMainContainer,
        setupAndCleanup
    );
    console.log('observers created');
}

async function setupChecker( findContainer : ElementFinder, findTrigger : ElementFinder, callback : Callback ) {
    setTimeout(() => {
        until(() => findContainer() != null)
        .then(() => {
            var triggerElement = findTrigger();
            if (triggerElement == null)
                throw triggerElement + ' is not available';
            createObserver(triggerElement, callback);
        });
    });
}

type Predicate = () => boolean;

function until( condition: Predicate ): Promise<void> {
    // var isLogging = false;
    // if( isLogging ) console.log( 'waiting...' );
    var n = 0;
    var timer : number;
    return new Promise( resolve => {
        timer = setInterval( () => {
            // if( isLogging ) console.log( timer, ++n );
            if ( condition() ) {
                clearInterval( timer );
                // if( isLogging ) console.log( 'ok' );
                resolve();
            }
        }, 500 );
        // if( isLogging ) console.log('container timer:', timer);
    });
};

type ElementCallback = (element: Element) => void;

function createObserver(triggerElement: Element, callback: ElementCallback) {
    var previousHtml = triggerElement.outerHTML;
    var timer =
    //var timer: number;
    //return function () {
        setInterval(() => {
            var html = triggerElement.outerHTML;
            if (html != previousHtml) {
                previousHtml = html;
                //clearInterval(timer);
                callback(triggerElement);
            }
        }, 500);
        // console.log('trigger timer:', timer);
    //}
}



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
    if ($('.cc_goto_login').length > 0) {
        console.log('hideAccount: yes');
        $('li.cc_my_account').hide();
    } else {
        console.log('hideAccount: no');
    }
}

function sanitizePhoneAndMobileInputFieldsContinuously() {
    console.log('setting up phone number sanitizer');
    $('input[type="tel"]').off().on('keyup', function(event) {
        console.log(event);
        var $this = $(this);
        $this.val(sanitizedPhoneNumber($this.val() + ''));
    });
}

function removeUserEditForm() {
    console.log('removing user edit form');
    document.querySelectorAll('#EditAccountMod').forEach(el => el.remove());
}

