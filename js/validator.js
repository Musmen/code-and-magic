'use strict';
// 2.4  Если диалог открыт, нажатие на кнопку «Сохранить» приводит к
// отправке формы
// 2.5  Если диалог открыт и фокус находится на кнопке «Сохранить»,
// нажатие на ENTER приводит к отправке формы
// ???НИЧЕГО НЕ НАДО, КРОМЕ РАЗМЕТКИ???

// 2.  Валидация ввода имени персонажа. Имя персонажа вводится в
// поле .setup-user-name. Добавьте следующие ограничения:
// o  имя персонажа не может содержать менее 2 символов;
// o  максимальная длина имени персонажа — 25 символов.
// Для указания ограничений на ввод используйте стандартные возможности
// форм HTML5.
(function () {
  var onSetupUserNameFieldInput = function (evt) {
    var message = '';
    if (!evt.target.value.length) {
      message = 'Имя обязательно';
    } else if (evt.target.value.length < 2) {
      message = 'Имя должно быть не меньше 2 символов';
    } else if (evt.target.value.length > 25) {
      message = 'Имя должно быть не больше 25 символов';
    }
    window.setup.userNameField.setCustomValidity(message);
  };

  window.setup.userNameField.addEventListener('input', onSetupUserNameFieldInput);
})();
