"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
console.log('custom javascript loaded');
$(function () {
    // Login validation error
    if ($('#login_main_content .messagingSection-Error').is(':visible')) {
        $('.cc_login_form').addClass('validation-error');
    }
    // Forgot password page - check valid email
    if ($('.cc_forgot_password_panel').length) {
        $('.cc_forgot_password_panel input[type=text]').on('keyup', function () {
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
    if (!isValidEmail($('.cc_forgot_password_panel input[type=text]').val() + ''))
        $('.cc_forgot_password_panel input[type=submit]').prop('disabled', true);
    else
        $('.cc_forgot_password_panel input[type=submit]').prop('disabled', false);
}
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function sanitizedPhoneNumber(phone) {
    var plusSign = phone.charAt(0) == '+' ? '+' : '';
    return (plusSign + (phone.replace(/[^0-9,]/g, '')));
}
function setupAllCheckers() {
    var findNavbarContainer = function () { return document.querySelector('ul.navbar-nav.cc_list-inline'); };
    var findMainContainer = function () { return document.querySelector('.acctmainSection'); };
    setupChecker(findNavbarContainer, findNavbarContainer, topNavBarChangedCallback);
    setupChecker(findMainContainer, findMainContainer, setupAndCleanup);
    console.log('observers created');
}
function setupChecker(findContainer, findTrigger, callback) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            setTimeout(function () {
                until(function () { return findContainer() != null; })
                    .then(function () {
                    var triggerElement = findTrigger();
                    if (triggerElement == null)
                        throw triggerElement + ' is not available';
                    createObserver(triggerElement, callback);
                });
            });
            return [2 /*return*/];
        });
    });
}
function until(condition) {
    // var isLogging = false;
    // if( isLogging ) console.log( 'waiting...' );
    var n = 0;
    var timer;
    return new Promise(function (resolve) {
        timer = setInterval(function () {
            // if( isLogging ) console.log( timer, ++n );
            if (condition()) {
                clearInterval(timer);
                // if( isLogging ) console.log( 'ok' );
                resolve();
            }
        }, 500);
        // if( isLogging ) console.log('container timer:', timer);
    });
}
;
function createObserver(triggerElement, callback) {
    var previousHtml = triggerElement.outerHTML;
    var timer = 
    //var timer: number;
    //return function () {
    setInterval(function () {
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
    setupEmailFieldChecker();
    setupRequiredFieldsChecker();
}
function setupRequiredFieldsChecker() {
    document.querySelectorAll('form').forEach(function (form) {
        var requiredFields = form.querySelectorAll('.form-control [required]');
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            requiredFields.forEach(function (field) {
                var input = field;
                if (input.value == '') {
                    input.classList.add('validation-error--empty');
                }
                else {
                    input.classList.remove('validation-error--empty');
                }
            });
            var inputs = inputArray(form.querySelectorAll('.form-control'));
            var isOk = inputs.every(isPopulated);
            console.log(isOk ? '' : 'NOT', 'all required fields are populated');
            return isOk;
        });
    });
}
function isPopulated(input) {
    return input.value.trim() != '';
}
function isPopulatedAndValid(input) {
    return (input.value.trim() != '') &&
        (!input.classList.contains('validation-error'));
}
function inputArray(nodes) {
    var result = [];
    for (var i = 0; i < nodes.length; i++) {
        result.push(nodes[i]);
    }
    return result;
}
function setupEmailFieldChecker() {
    $('input[type="email"]').on('keyup', function () {
        var $this = $(this);
        if (isValidEmail($this.val() + '')) {
            $this.removeClass('validation-error');
        }
        else {
            $this.addClass('validation-error');
        }
    });
}
function hideAccountLinkInTopNavbarIfNotLoggedIn() {
    if ($('.cc_goto_login').length > 0) {
        console.log('hideAccount: yes');
        $('li.cc_my_account').hide();
    }
    else {
        console.log('hideAccount: no');
    }
}
function sanitizePhoneAndMobileInputFieldsContinuously() {
    console.log('setting up phone number sanitizer');
    $('input[type="tel"]').off().on('keyup', function (event) {
        var $this = $(this);
        $this.val(sanitizedPhoneNumber($this.val() + ''));
    });
}
function removeUserEditForm() {
    console.log('removing user edit form');
    document.querySelectorAll('#EditAccountMod').forEach(function (el) { return el.remove(); });
}
