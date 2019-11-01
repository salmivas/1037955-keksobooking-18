'use strict';

(function () {
  var capacity = document.querySelector('#capacity');
  var roomNumber = document.querySelector('#room_number');
  var adForm = document.querySelector('.ad-form');
  var adFormSubmit = adForm.querySelector('.ad-form__submit');

  var roomsCapacityCompare = function () {
    var rooms = Number(roomNumber.value);
    var guests = Number(capacity.value);

    if (rooms === 1 && guests !== 1) {
      capacity.setCustomValidity('1 комната для 1 гостя');
    } else if (rooms === 2 && guests === 0 || guests > 2) {
      capacity.setCustomValidity('2 комнаты не более чем для 2 гостей');
    } else if (rooms === 3 && guests === 0 || guests > 3) {
      capacity.setCustomValidity('3 комнаты не более чем для 3 гостей');
    } else if (rooms === 100 && guests !== 0) {
      capacity.setCustomValidity('100 комнат не для гостей');
    } else {
      capacity.setCustomValidity('');
    }
  };

  roomNumber.addEventListener('change', roomsCapacityCompare);
  capacity.addEventListener('change', roomsCapacityCompare);
  adFormSubmit.addEventListener('click', roomsCapacityCompare);


  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(window.messageGenerator.successHandler, window.messageGenerator.errorHandler, new FormData(adForm));
  });
})();
