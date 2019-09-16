'use strict';
// 3. Изменение цвета мантии персонажа по нажатию. Цвет мантии .setup-wizard .wizard-coat
// должен обновляться по нажатию на неё. Цвет мантии
// задаётся через изменение инлайнового CSS-свойства fill для элемента.
// Цвет должен сменяться произвольным образом на один из следующих
// цветов:
// o  rgb(101, 137, 164)
// o  rgb(241, 43, 107)
// o  rgb(146, 100, 161)
// o  rgb(56, 159, 117)
// o  rgb(215, 210, 55)
// o  rgb(0, 0, 0)
(function () {

  var WIZARDS = {
    COLORS: {
      COAT: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
      EYES: ['black', 'red', 'blue', 'yellow', 'green'],
      FIREBALL: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
    }
  };

  var onClickChangeColor = function (element, colorFieldName, colorsArr) {
    var changeColor = function () {
      var colorField = window.setup.element.querySelector('input[name="' + colorFieldName + '"]');
      var value = window.utils.getRandomItem(colorsArr);

      colorField.value = value;
      colorField.setAttribute('value', value);

      switch (element.tagName.toLowerCase()) {
        case 'div':
          element.style.backgroundColor = value;
          break;
        default:
          element.style.fill = value;
          window.utils.debounce(window.similarWizards.changeList);
          break;
      }

    };

    element.addEventListener('click', changeColor);
  };
  // Для того, чтобы на сервер отправились правильные данные, при изменении
  // параметров персонажа должно изменяться и значение соответствующего
  // скрытого инпута.
  var wizardCoat = window.setup.element.querySelector('.setup-wizard .wizard-coat');
  onClickChangeColor(wizardCoat, 'coat-color', WIZARDS.COLORS.COAT);
  // 4.  Изменение цвета глаз персонажа по нажатию. Цвет глаз волшебника
  // меняется по нажатию на блок .setup-wizard .wizard-eyes. Возможные
  // варианты цвета глаз персонажа:
  // o  black
  // o  red
  // o  blue
  // o  yellow
  // o  green
  var wizardEyes = window.setup.element.querySelector('.setup-wizard .wizard-eyes');
  onClickChangeColor(wizardEyes, 'eyes-color', WIZARDS.COLORS.EYES);
  // 5.  Изменение цвета фаерболов по нажатию. Цвет задаётся через
  // изменение фона у блока .setup-fireball-wrap. Возможные варианты цвета:
  // o  #ee4830
  // o  #30a8ee
  // o  #5ce6c0
  // o  #e848d5
  // o  #e6e848
  var wizardFireball = window.setup.element.querySelector('.setup-fireball-wrap');
  onClickChangeColor(wizardFireball, 'fireball-color', WIZARDS.COLORS.FIREBALL);
})();
