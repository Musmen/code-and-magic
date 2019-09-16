'use strict';
// 2.  Создайте массив, состоящий из 4 сгенерированных JS объектов, которые будут описывать похожих персонажей.
// Объекты должны содержать следующие поля:
// o  name, строка — случайно сгенерированное имя персонажа. Имя генерируется из массивов имен и фамилий: нужно случайным образом выбрать
// из массива имен имя, а из массива фамилий фамилию и сложить их. При желании имя и фамилию можно в случайном порядке менять местами:)
// o  coatColor, строка — случайный цвет мантии на выбор из следующих
// o  eyesColor, строка — случайный цвет глаз персонажа на выбор из следующих:
// Стоит отдельно объявить функцию генерации случайных данных
(function () {
  var WIZARDS = {
    NAMES: ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
    SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
    COUNT: 4
  };

  window.WIZARDS = {
    COLORS: {
      COAT: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
      EYES: ['black', 'red', 'blue', 'yellow', 'green'],
      FIREBALL: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
    }
  };

  var generateWizards = function () {

    var setName = function () {
      var name = window.utils.getRandomItem(WIZARDS.NAMES);
      var surname = window.utils.getRandomItem(WIZARDS.SURNAMES);
      var result = [name, surname];
      var randomResultIndex = window.utils.getRandomInt(result.length);
      return result.splice(randomResultIndex, 1) + ' ' + result[0];
    };

    var Wizard = function () {
      this.name = setName();
      this.coatColor = window.utils.getRandomItem(window.WIZARDS.COLORS.COAT);
      this.eyesColor = window.utils.getRandomItem(window.WIZARDS.COLORS.EYES);
    };

    var wizards = [];
    for (var i = 0; i < WIZARDS.COUNT; i++) {
      wizards.push(new Wizard());
    }
    return wizards;
  };

  window.WIZARDS.PERSONS = generateWizards();

 })();
