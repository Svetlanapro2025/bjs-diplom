'use strict';

// выход из ЛК
const logoutButton = new LogoutButton();
logoutButton.action = function handleLogoutButton() {
    function handleLogoutResponse(response) {
        if (response.success) {
            location.reload();
        }
    }

    ApiConnector.logout(handleLogoutResponse);
};

// Получение инфо о пользователе
ApiConnector.current(
    function handleCurrentResponse(response) {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
        }
    }
);

const ratesBoard = new RatesBoard();
function getRates() {
    function handleRatesResponse(response) {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    }

    ApiConnector.getStocks(handleRatesResponse);
}

getRates();
setInterval(() => { getRates(); }, 60000);

const moneyManager = new MoneyManager();

// Пополнение баланса
moneyManager.addMoneyCallback = function handleAddMoney(data) {
    function handleAddMoneyResponse(response) {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Баланс успешно пополнен");
        } else {
            moneyManager.setMessage(response.success, response.error);
        }       
    }
    
    ApiConnector.addMoney(data, handleAddMoneyResponse);
};

// Конвертация валют
moneyManager.conversionMoneyCallback = function handleConversionMoney(data) {
    function handleConversionMoneyResponse(response) {
        if (response.success) {
            moneyManager.setMessage(response.success, "Валюта успешно конвертирована");
            ProfileWidget.showProfile(response.data);
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    }

    ApiConnector.convertMoney(data, handleConversionMoneyResponse);
};

// Перевод валюты
moneyManager.sendMoneyCallback = function handleSendMoney(data) {
    function handleSendMoneyResponse(response) {
        if (response.success) {
            moneyManager.setMessage(response.success, "Перевод успешно выполнен");
            ProfileWidget.showProfile(response.data);
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    }

    ApiConnector.transferMoney(data, handleSendMoneyResponse);
};

const favoritesWidget = new FavoritesWidget();

// Начальный список избранного
ApiConnector.getFavorites(
    function handleFavoritesResponse(response) {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        }
    }
);

// Добавление в избранное
favoritesWidget.addUserCallback = function handleAddUser(data) {
    function handleAddUserResponse(response) {
        if (response.success) {
            favoritesWidget.setMessage(response.success, "Пользователь добавлен в избранное");
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        } else {
            favoritesWidget.setMessage(response.success, response.error);
        }
    }

    ApiConnector.addUserToFavorites(data, handleAddUserResponse);
};

// Удаление из избранного
favoritesWidget.removeUserCallback = function handleRemoveUser(data) {
    function handleRemoveUserResponse(response) {
        if (response.success) {
            favoritesWidget.setMessage(response.success, "Пользователь удален из избранного");
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        } else {
            favoritesWidget.setMessage(response.success, response.error);
        }
    }

    ApiConnector.removeUserFromFavorites(data, handleRemoveUserResponse);
};
