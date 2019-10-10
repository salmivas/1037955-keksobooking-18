'use strict';

(function () {
  var PIN_TIP_LENGTH = 15;
  var MIN_Y_COORDINATE = 130;

  var KeyCode = {
    ESC: 27,
    ENTER: 13,
  };

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var addressField = adForm.querySelector('#address');

  var hiddenFieldsBeforeStart = document.querySelectorAll('.ad-form fieldset, .map__filters select, .map__filters fieldset');
  var initalPinPositionX = mapPinMain.offsetLeft;
  var initalPinPositionY = mapPinMain.offsetTop;
  var initalPinAddressX = initalPinPositionX + (mapPinMain.offsetWidth / 2);
  var initalPinAddressY = initalPinPositionY - MIN_Y_COORDINATE + (mapPinMain.offsetHeight / 2);

  var lock = function () {
    for (var i = 0; i < hiddenFieldsBeforeStart.length; i++) {
      hiddenFieldsBeforeStart[i].disabled = true;
    }
  };

  var enableMap = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    for (var i = 0; i < hiddenFieldsBeforeStart.length; i++) {
      hiddenFieldsBeforeStart[i].disabled = false;
    }
    addressField.value = getMainPinAddress(initalPinAddressX, initalPinPositionY - MIN_Y_COORDINATE + mapPinMain.offsetHeight + PIN_TIP_LENGTH);
  };

  var getMainPinAddress = function (posX, posY) {
    return Math.floor(posX) + ', ' + Math.floor(posY);
  };

  addressField.value = getMainPinAddress(initalPinAddressX, initalPinAddressY);

  mapPinMain.addEventListener('mousedown', function () {
    window.pinGenerator.init();
    enableMap();
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KeyCode.ENTER) {
      window.pinGenerator.init();
      enableMap();
    }
  });

  lock();
})();
