'use strict';

var OBJECTS_NUMBER = 8;
var PAD_SIZE = 2;
var ADDRESS_NUMBER = 1000;
var COST_NUMBER = 1000;
var ROOMS_NUMBER = 10;
var GUESTS_NUMBER = 10;
var ZERO = 0;
var MIN_Y_COORDINATE = 130;
var MAX_Y_COORCINATE = 630;
var PIN_TIP_LENGTH = 15;
var HOUSING_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var KeyCode = {
  ESC: 27,
  ENTER: 13,
};

var map = document.querySelector('.map');
var templateMapPin = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');
var mapPinMain = mapPins.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var addressField = adForm.querySelector('#address');
var roomNumber = adForm.querySelector('#room_number');
var capacity = adForm.querySelector('#capacity');
var adFormSubmit = adForm.querySelector('.ad-form__submit');
var hiddenFieldsBeforeStart = document.querySelectorAll('.ad-form fieldset, .map__filters select, .map__filters fieldset');
var initalPinPositionX = mapPinMain.offsetLeft;
var initalPinPositionY = mapPinMain.offsetTop;
var initalPinAddressX = initalPinPositionX + (mapPinMain.offsetWidth / 2);
var initalPinAddressY = initalPinPositionY - MIN_Y_COORDINATE + (mapPinMain.offsetHeight / 2);

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

var getLedZeroInt = function (num, size) {
  var s = num + '';
  while (s.length < size) {
    s = '0' + s;
  }
  return s;
};

var getRandomNumber = function (anyNumber) {
  return Math.floor(Math.random() * anyNumber);
};

var getRandomArrayLength = function (anyArray) {
  return Math.floor((Math.random() * anyArray.length) + 1);
};

var shuffleArray = function (anyArray) {
  for (var i = anyArray.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = anyArray[i];
    anyArray[i] = anyArray[j];
    anyArray[j] = temp;
  }
};

var getRandomArray = function (anyArray) {
  var newArray = anyArray.slice(getRandomArrayLength(anyArray));
  shuffleArray(newArray);
  return newArray;
};

var getRandomBetween = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var getRandomAd = function (number) {
  return {
    author: {
      avatar: 'img/avatars/user' + getLedZeroInt(number, PAD_SIZE) + '.png',
    },
    offer: {
      title: 'Random title_' + getLedZeroInt(number, PAD_SIZE),
      address: getRandomNumber(ADDRESS_NUMBER) + ', ' + getRandomNumber(ADDRESS_NUMBER),
      price: getRandomNumber(COST_NUMBER),
      type: getRandomArray(HOUSING_TYPE)[ZERO],
      rooms: getRandomNumber(ROOMS_NUMBER),
      guests: getRandomNumber(GUESTS_NUMBER),
      checkin: getRandomArray(CHECKIN_TIME)[ZERO],
      checkout: getRandomArray(CHECKOUT_TIME)[ZERO],
      features: getRandomArray(FEATURES),
      description: 'Random description_' + getLedZeroInt(number, PAD_SIZE),
      photos: getRandomArray(PHOTOS),
    },
    location: {
      x: getRandomBetween(ZERO + (templateMapPin.offsetWidth / 2), map.offsetWidth - (templateMapPin.offsetWidth / 2)),
      y: getRandomBetween(MIN_Y_COORDINATE, MAX_Y_COORCINATE),
    }
  };
};

var getAd = function (requiredNumber) {
  var adList = [];
  for (var i = 1; i < requiredNumber + 1; i++) {
    adList.push(getRandomAd(i));
  }
  return adList;
};

var ads = getAd(OBJECTS_NUMBER);

var renderPin = function (ad) {
  var pinElement = templateMapPin.cloneNode(true);

  pinElement.querySelector('img').src = ad.author.avatar;
  pinElement.querySelector('img').alt = ad.offer.title;
  pinElement.style.left = (ad.location.x + (templateMapPin.offsetWidth / 2)) + 'px';
  pinElement.style.top = (ad.location.y + templateMapPin.offsetHeight) + 'px';

  return pinElement;
};

var init = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(renderPin(ads[i]));
  }
  mapPins.appendChild(fragment);
};

addressField.value = getMainPinAddress(initalPinAddressX, initalPinAddressY);

mapPinMain.addEventListener('mousedown', function () {
  init();
  enableMap();
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KeyCode.ENTER) {
    init();
    enableMap();
  }
});

roomNumber.addEventListener('change', roomsCapacityCompare);
capacity.addEventListener('change', roomsCapacityCompare);
adFormSubmit.addEventListener('click', roomsCapacityCompare);

(function () {
  for (var i = 0; i < hiddenFieldsBeforeStart.length; i++) {
    hiddenFieldsBeforeStart[i].disabled = true;
  }
}
)();
