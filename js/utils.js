'use strict';
(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  window.utils = {
    onEnterPressedExecuter: function (evt, task) {
      if (evt.keyCode === ENTER_KEYCODE) {
        task();
      }
    },

    onESCPressedExecuter: function (evt, task) {
      if (evt.keyCode === ESC_KEYCODE) {
        task();
      }
    },

    getRandomInt: function (maxRange) {
      return Math.floor(Math.random() * maxRange);
    },

    getRandomItem: function (array) {
      return array[window.utils.getRandomInt(array.length)];
    },

    getRandomSubArray: function (array, length) {
      return array.slice().splice(window.utils.getRandomInt(array.length - length - 1), length);
    },

    getMaxItem: function (array) {
      return array.slice().reduce(function (maxItem, item) {
        return (item > maxItem) ? item : maxItem;
      });
    },

    timerID: 0,

    debounce: function (callback) {
      if (window.utils.timerID) {
        clearTimeout(window.utils.timerID);
      }
      window.utils.timerID = setTimeout(callback, 500);
    }

  };

})();
