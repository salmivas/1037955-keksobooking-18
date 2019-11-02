'use strict';

(function () {
  var capacity = document.querySelector('#capacity');
  var roomNumber = document.querySelector('#room_number');
  var adForm = document.querySelector('.ad-form');
  var adFormSubmit = adForm.querySelector('.ad-form__submit');
  var title = adForm.querySelector('#title');
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

  var Housing = {
    BUNGALO: 'bungalo',
    FLAT: 'flat',
    HOUSE: 'house',
    PALACE: 'palace',
  };

  var roomsCapacityCompare = function () {
    var rooms = Number(roomNumber.value);
    var guests = Number(capacity.value);

    if (rooms === 1 && guests !== 1) {
      capacity.setCustomValidity('1 комната для 1 гостя');
    } else if (rooms === 2 && guests === 0 || rooms === 2 && guests > 2) {
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
    for (var i = 0; i < timein.options.length; i++) {
      if (timein[i].selected === true) {
        for (var j = 0; j < timeout.options.length; j++) {
          if (timein[i].value === timeout[j].value) {
            timeout[j].selected = true;
          }
        }
      }
    }
  });

  timeout.addEventListener('change', function () {
    for (var i = 0; i < timeout.options.length; i++) {
      if (timeout[i].selected === true) {
        for (var j = 0; j < timein.options.length; j++) {
          if (timeout[i].value === timein[j].value) {
            timein[j].selected = true;
          }
        }
      }
    }
  });

  type.addEventListener('change', function () {
    var typeValue = type.value;

    switch (typeValue) {
      case Housing.BUNGALO:
        price.setAttribute('min', CostPerNight.BUNGALO);
        price.setAttribute('placeholder', CostPerNight.BUNGALO);
        break;
      case Housing.FLAT:
        price.setAttribute('min', CostPerNight.FLAT);
        price.setAttribute('placeholder', CostPerNight.FLAT);
        break;
      case Housing.HOUSE:
        price.setAttribute('min', CostPerNight.HOUSE);
        price.setAttribute('placeholder', CostPerNight.HOUSE);
        break;
      case Housing.PALACE:
        price.setAttribute('min', CostPerNight.PALACE);
        price.setAttribute('placeholder', CostPerNight.PALACE);
        break;
      default:
        break;
    }
  });

  title.addEventListener('invalid', function () {
    if (title.validity.tooShort) {
      title.setCustomValidity('Заголовок должен состоять минимум из 30 символов');
    } else if (title.validity.tooLong) {
      title.setCustomValidity('Заголовок должен состоять максимум из 100 символов');
    } else if (title.validity.valueMissing) {
      title.setCustomValidity('Обязательное поле');
    } else {
      title.setCustomValidity('');
    }
  });

  price.addEventListener('invalid', function () {
    if (price.validity.typeMismatch) {
      price.setCustomValidity('Введённое значение не является числом');
    } else if (price.validity.rangeOverflow) {
      price.setCustomValidity('Цена не должна быть более 1000000');
    } else if (price.validity.valueMissing) {
      price.setCustomValidity('Обязательное поле');
    } else {
      price.setCustomValidity('');
    }
  });

  adFormSubmit.addEventListener('click', roomsCapacityCompare);

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(window.messageGenerator.successHandler, window.messageGenerator.errorHandler, new FormData(adForm));
  });
})();
