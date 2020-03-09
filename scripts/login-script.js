//get elements from html
var loginForm = document.getElementById('loginForm');
var invalidMail = document.getElementById('invalidMail');
var invalidpassword = document.getElementById('invalidpassword');

//regex patterns to test mail & password
var regPassword = new RegExp('^(?=.*[a-z])(?=.*[A-Z]).{8,}$');
var regMail = new RegExp('^\\w{1,}@[a-z]{1,}.[com]{3}$');

//form submitting
function signIn(e) {
    e.preventDefault();

    //empty error spans on each click
    invalidMail.innerText = '';
    invalidpassword.innerText = '';

    //object contains user data
    var user = {
        mail: loginForm.email.value,
        password: loginForm.password.value,
    }


    //test mail & password
    var emailValidate = regMail.test(user.mail);
    var passValidate = regPassword.test(user.password);

    //if user enter valid data --> assign him to home page
    if (emailValidate && passValidate) {
        window.location.href = './home.html';
    }


    //check if user enter invalid mail
    if (!emailValidate) {
        invalidMail.innerText = 'email must contains @ character and end with .com';
    }

    //check if user enter invalid password
    if (!passValidate) {
        invalidpassword.innerText = ' Password must contains capital letters , small letters and numbers. '
    }

    //empty inputs on each click
    loginForm.email.value = "";
    loginForm.password.value = "";
}