'use strict';

(function () {
  var URL = 'https://js.dump.academy/code-and-magick';
  var backend = {};

  var onRequestLoad = function (xhr, onLoad, onError) {
    var errorMessage = '';

    switch (xhr.status) {
      case 200:
        onLoad(xhr.response);
        break;
      case 300:
        errorMessage = 'Искомый ресурс перемещен...';
        break;
      case 400:
        errorMessage = 'Ошибка в запросе на сервер...';
        break;
      case 404:
        errorMessage = 'Искомый ресурс не найден...';
        break;
      default:
        errorMessage = 'Ошибка соединения с сервером. Статус: ' + xhr.status + ', описание: ' + xhr.statusText;
    }

    if (errorMessage) {
      onError(errorMessage);
    }
  };

  var onRequestError = function (xhr, onError) {
    onError('Ошибка соединения с сервером. Статус: ' + xhr.status + ', описание: ' + xhr.statusText);
  };

  var onRequestTimeout = function (xhr, onError) {
    onError('Превышено время ожидания ' + xhr.timeout + ' ms');
  };

  var setRequestListeners = function (xhr, onLoad, onError) {
    xhr.addEventListener('load', function (evt) {
      onRequestLoad(evt.target, onLoad, onError);
    });
    xhr.addEventListener('error', function (evt) {
      onRequestError(evt.target, onError);
    });
    xhr.timeout = 2000;
    xhr.addEventListener('timeout', function (evt) {
      onRequestTimeout(evt.target, onError);
    });
  };

  backend.load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', URL + '/data', true);
    xhr.responseType = 'json';
    setRequestListeners(xhr, onLoad, onError);
    xhr.send();
  };

  backend.save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', URL, true);
    setRequestListeners(xhr, onLoad, onError);
    xhr.send(data);
  };

  backend.onError = function (message) {
    var hideError = function () {
      document.removeEventListener('click', hideError);
      document.removeEventListener('keydown', hideError);
      document.body.removeChild(div);
    };

    var div = document.createElement('div');
    div.style.cssText = 'z-index: 100; background: red; height: 100px; width: 40%; padding-top: 20px;' +
      'text-align: center; font-size: 30px; position: absolute; left: 400px;';
    div.textContent = message;

    document.addEventListener('click', hideError);
    document.addEventListener('keydown', hideError);

    document.body.insertAdjacentElement('beforeEnd', div);
  };

  window.backend = {
    load: backend.load,
    save: backend.save,
    onError: backend.onError
  };

})();
