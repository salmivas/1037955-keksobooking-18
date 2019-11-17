'use strict';

(function () {
  var PIN_TIP_LENGTH = 15;
  var MIN_Y_COORDINATE = 130;
  var MAX_Y_COORCINATE = 630;
  var ZERO = 0;

  var KeyCode = {
    ESC: 27,
    ENTER: 13,
  };

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters');
  var addressField = adForm.querySelector('#address');

  var hiddenFieldsBeforeStart = document.querySelectorAll('.ad-form fieldset, .map__filters select, .map__filters fieldset');
  var initalPinPositionX = mapPinMain.offsetLeft;
  var initalPinPositionY = mapPinMain.offsetTop;
  var initalPinAddressX = initalPinPositionX + (mapPinMain.offsetWidth / 2);
  var initalPinAddressY = initalPinPositionY - MIN_Y_COORDINATE + (mapPinMain.offsetHeight / 2);
  var initialPinStyleTop = mapPinMain.style.top;
  var initialPinStyleLeft = mapPinMain.style.left;
  var shiftX;
  var shiftY;

  var onMouseDown = function (evt) {
    evt.preventDefault();

    shiftX = evt.clientX - mapPinMain.getBoundingClientRect().left;
    shiftY = evt.clientY - mapPinMain.getBoundingClientRect().top;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    enableMap();
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var activatedPinAddressX = mapPinMain.offsetLeft + (mapPinMain.offsetWidth / 2);
    var activatedPinAddressY = mapPinMain.offsetTop + mapPinMain.offsetHeight + PIN_TIP_LENGTH;

    mapPinMain.style.top = Math.max(mainPinLimit.minY, Math.min(moveEvt.pageY - shiftY, mainPinLimit.maxY)) + 'px';
    mapPinMain.style.left = Math.max(mainPinLimit.minX, Math.min(moveEvt.pageX - map.offsetLeft - shiftX, mainPinLimit.maxX)) + 'px';
    addressField.value = getMainPinAddress(activatedPinAddressX, activatedPinAddressY);
  };

  var mainPinLimit = {
    minY: MIN_Y_COORDINATE - mapPinMain.offsetHeight - PIN_TIP_LENGTH,
    maxY: MAX_Y_COORCINATE - mapPinMain.offsetHeight - PIN_TIP_LENGTH,
    minX: ZERO - (mapPinMain.offsetWidth / 2),
    maxX: map.offsetWidth - (mapPinMain.offsetWidth / 2),
  };

  var lock = function () {
    for (var i = 0; i < hiddenFieldsBeforeStart.length; i++) {
      hiddenFieldsBeforeStart[i].disabled = true;
    }
  };

  var enableMap = function () {
    if (map.classList.contains('map--faded')) {
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      for (var i = 0; i < hiddenFieldsBeforeStart.length; i++) {
        hiddenFieldsBeforeStart[i].disabled = false;
      }
      window.backend.get(window.pin.init, window.pin.showError);
    }
  };

  var adCardRemove = function () {
    var mapCard = map.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
  };

  var disableMap = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    lock();
    window.pin.removeAd();
    adCardRemove();
    adForm.reset();
    mapFilters.reset();
    mapPinMain.style.left = initialPinStyleLeft;
    mapPinMain.style.top = initialPinStyleTop;
    addressField.value = getMainPinAddress(initalPinAddressX, initalPinAddressY);
  };

  var getMainPinAddress = function (posX, posY) {
    return Math.floor(posX) + ', ' + Math.floor(posY);
  };

  addressField.value = getMainPinAddress(initalPinAddressX, initalPinAddressY);

  mapPinMain.addEventListener('mousedown', onMouseDown);

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KeyCode.ENTER) {
      enableMap();
    }
  });

  lock();

  window.start = {
    disableMap: disableMap,
    adCardRemove: adCardRemove,
    keyCode: KeyCode,
  };
})();
