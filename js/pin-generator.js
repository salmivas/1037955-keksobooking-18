'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');
  var templateMapPin = document.querySelector('#pin').content.querySelector('.map__pin');
  var templateError = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');
  var mapFiltersContainer = main.querySelector('.map__filters-container');
  var receivedPinsData = [];
  var housingType = main.querySelector('#housing-type');
  var housingPrice = main.querySelector('#housing-price');
  var housingRooms = main.querySelector('#housing-rooms');
  var housnngGuests = main.querySelector('#housing-guests');

  var mapFilters = main.querySelector('.map__filters');

  var removeExistentCard = function () {
    var mapCard = main.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
  };

  var removeActivePin = function (list) {
    for (var i = 0; i < list.length; i++) {
      list.item(i).classList.remove('map__pin--active');
    }
  };

  var removeAdPins = function () {
    var pins = document.querySelectorAll('.map__pin');
    for (var i = 1; i < pins.length; i++) {
      pins[i].remove();
    }
  };

  var renderPin = function (ad) {
    var pinElement = templateMapPin.cloneNode(true);

    pinElement.querySelector('img').src = ad.author.avatar;
    pinElement.querySelector('img').alt = ad.offer.title;
    pinElement.style.left = (ad.location.x + (templateMapPin.offsetWidth / 2)) + 'px';
    pinElement.style.top = (ad.location.y + templateMapPin.offsetHeight) + 'px';

    pinElement.addEventListener('click', function () {
      removeActivePin(main.querySelectorAll('.map__pin'));
      removeExistentCard();
      mapFiltersContainer.before(window.cardGenerator.renderCard(ad));
      pinElement.classList.add('map__pin--active');
    });

    return pinElement;
  };

  var showError = function () {
    var errorElement = templateError.cloneNode(true);

    main.insertAdjacentElement('afterbegin', errorElement);
    var tryAgainButton = main.querySelector('.error__button');
    errorElement = main.querySelector('.error');
    tryAgainButton.addEventListener('mousedown', function () {
      window.location.reload();
    });
  };

  var pasteToDOM = function (renderFunc, arr) {
    removeAdPins();
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(renderFunc(arr[i]));
    }

    return fragment;
  };

  var chooseByHousing = function (it) {
    return it.offer.type === housingType.value || housingType.value === 'any';
  };

  var chooseByPrice = function (it) {
    var switcher;
    if (housingPrice.value === 'any') {
      switcher = true;
    } else if (housingPrice.value === 'middle' && it.offer.price >= 10000 && it.offer.price <= 50000) {
      switcher = true;
    } else if (housingPrice.value === 'low' && it.offer.price < 10000) {
      switcher = true;
    } else if (housingPrice.value === 'high' && it.offer.price > 50000) {
      switcher = true;
    }
    return switcher;
  };

  var chooseByHousingRooms = function (it) {
    return it.offer.rooms.toString() === housingRooms.value || housingRooms.value === 'any';
  };

  var chooseByHousingGuests = function (it) {
    return it.offer.guests.toString() === housnngGuests.value || housnngGuests.value === 'any';
  };

  var chooseByFeatures = function (it) {
    var checkedFeatureCheckboxes = Array.from(document.querySelectorAll('.map__checkbox:checked')).map(function (map) {
      return map.value;
    });
    return checkedFeatureCheckboxes.every(function (checkedCheckbox) {
      return it.offer.features.indexOf(checkedCheckbox) > -1;
    });
  };

  var drawPins = function () {
    var returnedPins = receivedPinsData
      .filter(chooseByHousing)
      .filter(chooseByPrice)
      .filter(chooseByHousingRooms)
      .filter(chooseByHousingGuests)
      .filter(chooseByFeatures)
      .slice(0, 5);
    mapPins.appendChild(pasteToDOM(renderPin, returnedPins));
  };

  mapFilters.addEventListener('change', function () {
    drawPins();
  });

  var init = function (pins) {
    receivedPinsData = pins;
    drawPins();
  };

  window.pinGenerator = {
    removeActivePin: removeActivePin,
    removeAdPins: removeAdPins,
    receivedPinsData: receivedPinsData,
    init: init,
    showError: showError,
  };
})();
