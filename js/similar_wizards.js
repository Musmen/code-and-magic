'use strict';
// 3.  На основе данных, созданных в предыдущем пункте и шаблона #similar-wizard-template
// создайте DOM-элементы, соответствующие случайно сгенерированным волшебникам
// и заполните их данными из массива:
// o  Имя персонажа name запишите как текст в блок .setup-similar-label;
// o  Цвет мантии coatColor задайте как цвет заливки fill в стилях элемента .wizard-coat;
// o  Цвет глаз eyesColor задайте как цвет заливки fill в стилях элемента .wizard-eyes.
// Стоит отдельно объявить функцию создания DOM-элемента на основе JS-объекта.
(function () {

  // 2.  Создайте массив, состоящий из 4 сгенерированных JS объектов, которые будут описывать похожих персонажей.
  // Объекты должны содержать следующие поля:
  // o  name, строка — случайно сгенерированное имя персонажа. Имя генерируется из массивов имен и фамилий: нужно случайным образом выбрать
  // из массива имен имя, а из массива фамилий фамилию и сложить их. При желании имя и фамилию можно в случайном порядке менять местами:)
  // o  coatColor, строка — случайный цвет мантии на выбор из следующих
  // o  eyesColor, строка — случайный цвет глаз персонажа на выбор из следующих:
  // Стоит отдельно объявить функцию генерации случайных данных

  // ********************************************************************* Моковые данные
  var CHARACTER_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var CHARACTER_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var CHARACTER_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var CHARACTER_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var SIMILAR_WIZARDS_COUNT = 10;

  var generateCharacters = function (numberOfCharacters) {

    var setName = function () {
      var name = window.utils.getRandomItem(CHARACTER_NAMES);
      var surname = window.utils.getRandomItem(CHARACTER_SURNAMES);
      var result = [name, surname];
      var randomResultIndex = window.utils.getRandomInt(result.length);
      return result[randomResultIndex] + ' ' + result[result.length - randomResultIndex - 1];
    };

    var Character = function () {
      this.name = setName();
      this.colorCoat = window.utils.getRandomItem(CHARACTER_COAT_COLORS);
      this.colorEyes = window.utils.getRandomItem(CHARACTER_EYES_COLORS);
    };

    var characters = [];
    for (var i = 0; i < numberOfCharacters; i++) {
      characters.push(new Character());
    }
    return characters;
  };

  var characters = generateCharacters(SIMILAR_WIZARDS_COUNT);
  // ********************************************************************

  var allSimilarWizards = [];
  var newSimilarWizards = [];

  var wizardSetup = document.body.querySelector('.setup-wizard-appearance');
  var wizardCoatField = wizardSetup.querySelector('input[name="coat-color"]');
  var wizardEyesField = wizardSetup.querySelector('input[name="eyes-color"]');

  var SIMILAR_WIZARDS_RENDER_COUNT = 4;

  var createSimilarWizardsElements = function () {
    var similarWizardsTemplate = document.body.querySelector('#similar-wizard-template').
      content.querySelector('.setup-similar-item');
    var wizardsElements = [];

    for (var i = 0; i < SIMILAR_WIZARDS_RENDER_COUNT; i++) {
      var wizardElements = similarWizardsTemplate.cloneNode(true);
      wizardElements.querySelector('.setup-similar-label').textContent = newSimilarWizards[i].name;
      wizardElements.querySelector('.wizard-coat').style.fill = newSimilarWizards[i].colorCoat;
      wizardElements.querySelector('.wizard-eyes').style.fill = newSimilarWizards[i].colorEyes;
      wizardsElements.push(wizardElements);
    }

    return wizardsElements;
  };

  // 4.  Отрисуйте сгенерированные DOM-элементы в блок .setup-similar-list.
  // Для вставки элементов используйте DocumentFragment.
  // Стоит отдельно объявить функцию заполнения блока DOM-элементами на основе массива JS-объектов.

  var renderSimilarWizardsElements = function (wizardsContainer, wizardsElements) {
    wizardsContainer.textContent = '';
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < wizardsElements.length; i++) {
      fragment.appendChild(wizardsElements[i]);
    }
    wizardsContainer.appendChild(fragment);
  };

  var onChangeColor = function () {
    newSimilarWizards = allSimilarWizards.slice();
    newSimilarWizards.forEach(function (item, index) {
      newSimilarWizards[index].rank = 0;
      if (item.colorCoat === wizardCoatField.value) {
        newSimilarWizards[index].rank += 2;
      }
      if (item.colorEyes === wizardEyesField.value) {
        newSimilarWizards[index].rank += 1;
      }
    });

    newSimilarWizards.sort(function (left, right) {
      return right.rank - left.rank;
    });
    var similarSetupPopup = document.body.querySelector('.setup-similar');
    var similarWizardsContainer = similarSetupPopup.querySelector('.setup-similar-list');
    var similarWizardsElements = createSimilarWizardsElements();
    renderSimilarWizardsElements(similarWizardsContainer, similarWizardsElements);
  };

  var onLoad = function (data) {
    allSimilarWizards = data;
    onChangeColor();
  };

  // window.backend.load(onLoad, window.backend.onError);
  onLoad(characters);

  window.similarWizards = {
    create: createSimilarWizardsElements,
    render: renderSimilarWizardsElements,
    changeList: onChangeColor
  };

})();
