'use strict';

(function () {
  var fileField = document.body.querySelector('.setup input[name="avatar"]');
  var avatarIcon = document.body.querySelector('.setup-open-icon');
  var setupIcon = document.body.querySelector('.setup-user-pic');
  var dataURL = null;
  var fileType = null;

  var isValidFileType = function (inputFile) {
    fileType = inputFile.type.split('/');
    return fileType[0] === 'image';
  };

  var onFileChange = function (inputFile) {
    if (!isValidFileType(inputFile)) {
      var message = 'Выбран неверный тип файла' +
        (fileType[0] ? (': ' + fileType[0]) : '');
      window.backend.onError(message);
      return;
    }

    var reader = new FileReader();

    reader.addEventListener('load',
        function (evt) {
          dataURL = evt.target.result;
          avatarIcon.src = dataURL;
          setupIcon.src = dataURL;
        }
    );

    reader.addEventListener('error',
        function (evt) {
          window.backend.onError('Ошибка чтения файла: ' + evt.target.error.code);
        }
    );

    reader.readAsDataURL(inputFile);
  };

  fileField.addEventListener('change',
      function () {
        onFileChange(fileField.files[0]);
      }
  );

  fileField.addEventListener('dragOver',
      function (evt) {
        evt.preventDefault();
      }
  );

  fileField.addEventListener('drop',
      function (evt) {
        evt.preventDefault();
        onFileChange(evt.dataTransfer.files[0]);
      }
  );

})();
