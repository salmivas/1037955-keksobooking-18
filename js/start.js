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
  var addressField = adForm.querySelector('#address');

  var hiddenFieldsBeforeStart = document.querySelectorAll('.ad-form fieldset, .map__filters select, .map__filters fieldset');
  var initalPinPositionX = mapPinMain.offsetLeft;
  var initalPinPositionY = mapPinMain.offsetTop;
  var initalPinAddressX = initalPinPositionX + (mapPinMain.offsetWidth / 2);
  var initalPinAddressY = initalPinPositionY - MIN_Y_COORDINATE + (mapPinMain.offsetHeight / 2);
  var mainPinLimits = {
    minY: MIN_Y_COORDINATE - mapPinMain.offsetHeight - PIN_TIP_LENGTH,
    maxY: MAX_Y_COORCINATE - mapPinMain.offsetHeight - PIN_TIP_LENGTH,
    minX: ZERO - (mapPinMain.offsetWidth / 2),
    maxX: map.offsetWidth - (mapPinMain.offsetWidth / 2),
  };
  var onMouseMove;
  var onMouseUp;

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
  };

  var getMainPinAddress = function (posX, posY) {
    return Math.floor(posX) + ', ' + Math.floor(posY);
  };

  addressField.value = getMainPinAddress(initalPinAddressX, initalPinAddressY);

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var shiftX = evt.clientX - mapPinMain.getBoundingClientRect().left;
    var shiftY = evt.clientY - mapPinMain.getBoundingClientRect().top;

    onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var activatedPinAddressX = mapPinMain.offsetLeft + (mapPinMain.offsetWidth / 2);
      var activatedPinAddressY = mapPinMain.offsetTop + mapPinMain.offsetHeight + PIN_TIP_LENGTH;

      mapPinMain.style.top = Math.max(mainPinLimits.minY, Math.min(moveEvt.pageY - shiftY, mainPinLimits.maxY)) + 'px';
      mapPinMain.style.left = Math.max(mainPinLimits.minX, Math.min(moveEvt.pageX - map.offsetLeft - shiftX, mainPinLimits.maxX)) + 'px';
      addressField.value = getMainPinAddress(activatedPinAddressX, activatedPinAddressY);
    };

    onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
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
