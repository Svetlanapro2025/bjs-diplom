'use strict';

const userForm = new UserForm();

userForm.loginFormCallback = function handleLoginForm(data) {
    function handleLoginResponse(response) {
        if (response.success) {
            location.reload();
        } else {
            userForm.setLoginErrorMessage(response.error);
        }
    }

    ApiConnector.login(data, handleLoginResponse);
};

userForm.registerFormCallback = function handleRegisterForm(data) {
    function handleRegisterResponse(response) {
        if (response.success) {
            location.reload();
        } else {
            userForm.setRegisterErrorMessage(response.error);
        }
    }

    ApiConnector.register(data, handleRegisterResponse);
};