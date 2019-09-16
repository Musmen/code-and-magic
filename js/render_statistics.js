'use strict';
/*
•  ctx — канвас на котором рисуется игра.
•  names — массив, с именами игроков прошедших уровень. Имя самого
игрока — Вы. Массив имён формируется случайным образом.
•  times — массив, по длине совпадающий с массивом names. Массив
содержит время прохождения уровня соответствующего игрока
из массива names. Время прохождения уровня задано в миллисекундах.
*/
(function () {
  var SCREEN_START_X = 100;
  var	SCREEN_START_Y = 10;
  var	SCREEN_WIDTH = 420;
  var	SCREEN_HEIGHT = 270;
  var GAP = 10;

  var TEXT_GAP = 10;
  var TEXT_HEIGHT = 20;
  var TEXT_WIDTH = 80;
  var TEXT_MIDDLE_X = (SCREEN_WIDTH - SCREEN_START_X) / 2 + TEXT_WIDTH;
  var TEXT_START_X = SCREEN_START_X + GAP;
  var TEXT_START_Y = SCREEN_START_Y + TEXT_HEIGHT + TEXT_GAP;

  var	COLUMN_WIDTH = 40;
  var	COLUMN_MAX_HEIGHT = 150;
  var	SPACE_TO_COLUMN = 50;

  window.renderStatistics = function (ctx, names, times) {

    var renderCloud = function (x, y, colorFill) {
      ctx.fillStyle = colorFill;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + SCREEN_WIDTH / 2, y + 10);
      ctx.lineTo(x + SCREEN_WIDTH, y);
      ctx.lineTo(x + SCREEN_WIDTH - 25, y + SCREEN_HEIGHT / 2);
      ctx.lineTo(x + SCREEN_WIDTH, y + SCREEN_HEIGHT);
      ctx.lineTo(x + SCREEN_WIDTH / 2, y + SCREEN_HEIGHT - 10);
      ctx.lineTo(x, y + SCREEN_HEIGHT);
      ctx.lineTo(x + 25, y + SCREEN_HEIGHT / 2);
      ctx.lineTo(x, y);
      ctx.fill();
      ctx.closePath();
    };

    renderCloud(SCREEN_START_X + GAP, SCREEN_START_Y + GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(SCREEN_START_X, SCREEN_START_Y, 'white');

    ctx.fillStyle = 'black';
    ctx.font = '16px PT Mono';
    ctx.fillText('Ура вы победили!', TEXT_MIDDLE_X, TEXT_START_Y);
    ctx.fillText('Список результатов:', TEXT_START_X, TEXT_START_Y + TEXT_HEIGHT);

    var drawColumn = function (x, y, columnHeight, columnColor) {
      ctx.fillStyle = columnColor;
      ctx.fillRect(x, y, COLUMN_WIDTH, columnHeight);
      ctx.fillStyle = 'black';
      ctx.fillText('' + Math.round(times[i]), x, y - TEXT_GAP);
      ctx.fillText('' + names[i], x, y + columnHeight + TEXT_HEIGHT);
    };

    var MAX_TIME = Math.round(window.utils.getMaxItem(times));
    var CURRENT_USER_COLOR = 'rgba(255, 0, 0, 1)';
    var CURRENT_USER_NAME = 'Вы';
    var COLUMN_START_X = SCREEN_START_X + SPACE_TO_COLUMN;
    var COLUMN_Y_MAXLINE = SCREEN_START_Y + COLUMN_MAX_HEIGHT + TEXT_HEIGHT * 3 + TEXT_GAP * 2;

    var columnHeight = 0;
    var columnColor = '';
    var intensityBlueColor = '';

    for (var i = 0; i < times.length; i++) {
      columnHeight = Math.round((times[i] / MAX_TIME) * COLUMN_MAX_HEIGHT);
      intensityBlueColor = 'rgba(0, 0, ' + 255 * Math.random() + ', 1)';
      columnColor = (names[i] === CURRENT_USER_NAME) ? CURRENT_USER_COLOR : intensityBlueColor;
      drawColumn(COLUMN_START_X + (COLUMN_WIDTH + SPACE_TO_COLUMN) * i, COLUMN_Y_MAXLINE - columnHeight, columnHeight, columnColor);
    }
  };
})();
