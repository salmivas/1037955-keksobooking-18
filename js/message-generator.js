'use strict';

(function () {
  var main = document.querySelector('main');
  var templateSuccessMessage = document.querySelector('#success').content.querySelector('.success');
  var templateErrorMessage = document.querySelector('#error').content.querySelector('.error');
  var body = document.querySelector('body');

  var errorHandler = function () {
    var element = templateErrorMessage.cloneNode(true);
    main.prepend(element);
    var errorButton = main.querySelector('.error__button');
    var errorMessage = main.querySelector('.error');
    var removeElement = function () {
      element.remove();
    };

    errorButton.addEventListener('click', removeElement);
    errorMessage.addEventListener('click', removeElement);
    body.addEventListener('keydown', function func(evt) {
      if (evt.keyCode === window.start.keyCode.ESC) {
        element.remove();
      }
      body.removeEventListener('keydown', func);
    });
  };

  var successHandler = function () {
    var element = templateSuccessMessage.cloneNode(true);
    main.prepend(element);
    var successMessage = main.querySelector('.success');

    successMessage.addEventListener('click', function () {
      element.remove();
    });
    body.addEventListener('keydown', function func(evt) {
      if (evt.keyCode === window.start.keyCode.ESC) {
        element.remove();
      }
      body.removeEventListener('keydown', func);
    });
    window.start.disableMap();
  };

  window.messageGenerator = {
    errorHandler: errorHandler,
    successHandler: successHandler,
  };
})();
