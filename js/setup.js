'use strict';
// Задание №4
// 1.  Открытие/закрытие окна настройки персонажа:
// o  Окно.setup должно открываться по нажатию на блок.setup-open.
// Открытие окна производится удалением класса hidden у блока
// o  Окно.setup должно закрываться по нажатию на элемент.setup-close,
// расположенный внутри окна
(function () {
  window.setup = {
    element: document.body.querySelector('.setup')
  };

  window.setup.userNameField = window.setup.element.querySelector('.setup-user-name');

  window.setup.setPosition = function (x, y) {
    window.setup.element.style.left = x + 'px';
    window.setup.element.style.top = y + 'px';
  };

  var setupOpenButton = document.body.querySelector('.setup-open');
  var setupCloseButton = window.setup.element.querySelector('.setup-close');

  // 2. Добавить обработчики для альтернативного ввода с
  // клавиатуры keydown для кнопок открытия/закрытия диалога настройки
  // персонажа:
  // 2.6  Когда окно настройки персонажа открыто, нажатие на
  // клавишу ESC должно закрывать диалог
  // 2.3 Если фокус находится на форме ввода имени, то окно закрываться
  // не должно.
  var onSetupEscPressed = function (evt) {
    if (evt.target !== window.setup.userNameField) {
      window.utils.onESCPressedExecuter(evt, closeSetup);
    }
  };

  // var similarSetupPopup = document.body.querySelector('.setup-similar');
  // var similarWizardsContainer = similarSetupPopup.querySelector('.setup-similar-list');

  var openSetup = function () {
    if (window.setup.element.classList.contains('hidden')) {
      // var similarWizardsElements = window.similarWizards.create();
      // window.similarWizards.render(similarWizardsContainer, similarWizardsElements);
      window.setup.element.classList.remove('hidden');
      document.addEventListener('keydown', onSetupEscPressed);
    }

    if (!window.setup.startCoord) {
      window.setup.startCoord = {
        x: window.setup.element.offsetLeft,
        y: window.setup.element.offsetTop
      };
    }
  };

  var closeSetup = function () {
    window.setup.element.classList.add('hidden');
    // similarWizardsContainer.textContent = '';
    window.setup.setPosition(window.setup.startCoord.x, window.setup.startCoord.y);
    document.removeEventListener('keydown', onSetupEscPressed);
  };

  setupOpenButton.addEventListener('click', openSetup);
  setupCloseButton.addEventListener('click', closeSetup);

  // 2.1 Когда иконка пользователя в фокусе .setup-open-icon, то окно
  // настройки персонажа должно открываться по нажатию кнопки ENTER
  // Не забудьте добавить tabindex="0" для иконки пользователя, чтобы
  // она фокусировалась.
  setupOpenButton.addEventListener('keydown', function (evt) {
    window.utils.onEnterPressedExecuter(evt, openSetup);
  });

  // 2.2  Если окно открыто и фокус находится на кнопке закрытия окна, то
  // нажатие клавиши ENTER должно приводить к закрытию диалога
  setupCloseButton.addEventListener('keydown', function (evt) {
    window.utils.onEnterPressedExecuter(evt, closeSetup);
  });

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    var data = new FormData(evt.target);
    window.backend.save(data, closeSetup, window.backend.onError);
  };

  var form = window.setup.element.querySelector('.setup-wizard-form');
  form.addEventListener('submit', onFormSubmit);

})();
