'use strict';

(function () {
  var setupUserPicUpload = window.setup.element.querySelector('.upload');

  var onSetupUserPicMousedown =	function (evtMouseDown) {
    var isDraggable = false;
    var shiftX = null;
    var shiftY = null;

    var onSetupUserPicMousemove = function (evtMouseMove) {
      if (!isDraggable) {
        var onSetupUserPicClick = function (evt) {
          evt.preventDefault();
          setupUserPicUpload.removeEventListener('click', onSetupUserPicClick);
        };

        setupUserPicUpload.addEventListener('click', onSetupUserPicClick);
        shiftX = evtMouseDown.clientX - window.setup.element.offsetLeft;
        shiftY = evtMouseDown.clientY - window.setup.element.offsetTop;
        isDraggable = true;
      }

      window.setup.setPosition(evtMouseMove.clientX - shiftX, evtMouseMove.clientY - shiftY);
    };

    var onSetupUserPicMouseup = function () {
      document.removeEventListener('mousemove', onSetupUserPicMousemove);
      document.removeEventListener('mouseup', onSetupUserPicMouseup);
    };

    document.addEventListener('mousemove', onSetupUserPicMousemove);
    document.addEventListener('mouseup', onSetupUserPicMouseup);
  };

  setupUserPicUpload.addEventListener('mousedown', onSetupUserPicMousedown);

})();
