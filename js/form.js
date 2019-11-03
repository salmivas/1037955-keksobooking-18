'use strict';

(function () {
  var capacity = document.querySelector('#capacity');
  var roomNumber = document.querySelector('#room_number');
  var adForm = document.querySelector('.ad-form');
  var adFormSubmit = adForm.querySelector('.ad-form__submit');
  var price = adForm.querySelector('#price');
  var type = adForm.querySelector('#type');
  var timein = adForm.querySelector('#timein');
  var timeout = adForm.querySelector('#timeout');

  var CostPerNight = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000,
  };

  var roomsCapacityCompare = function () {
    var rooms = Number(roomNumber.value);
    var guests = Number(capacity.value);

    if (rooms === 1 && guests !== 1) {
      capacity.setCustomValidity('1 комната для 1 гостя');
    } else if (rooms === 2 && (guests === 0 || guests > 2)) {
      capacity.setCustomValidity('2 комнаты не более чем для 2 гостей');
    } else if (rooms === 3 && guests === 0 || guests > 3) {
      capacity.setCustomValidity('3 комнаты не более чем для 3 гостей');
    } else if (rooms === 100 && guests !== 0) {
      capacity.setCustomValidity('100 комнат не для гостей');
    } else {
      capacity.setCustomValidity('');
    }
  };

  timein.addEventListener('change', function () {
    timeout.value = timein.value;
  });

  timeout.addEventListener('change', function () {
    timein.value = timeout.value;
  });

  type.addEventListener('change', function () {
    var typeValue = type.value;

    price.setAttribute('min', CostPerNight[typeValue]);
    price.setAttribute('placeholder', CostPerNight[typeValue]);
  });

  adFormSubmit.addEventListener('click', roomsCapacityCompare);

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(window.messageGenerator.successHandler, window.messageGenerator.errorHandler, new FormData(adForm));
  });
})();
