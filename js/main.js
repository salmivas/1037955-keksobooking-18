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
var HOUSING_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var similarPinList = document.querySelector('.map__pins');
var map = document.querySelector('.map');
map.classList.remove('map--faded');

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
      x: getRandomBetween(ZERO + (similarPinTemplate.offsetWidth / 2), map.offsetWidth - (similarPinTemplate.offsetWidth / 2)),
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
  var pinElement = similarPinTemplate.cloneNode(true);

  pinElement.querySelector('img').src = ad.author.avatar;
  pinElement.querySelector('img').alt = ad.offer.title;
  pinElement.style.left = (ad.location.x + (similarPinTemplate.offsetWidth / 2)) + 'px';
  pinElement.style.top = (ad.location.y + similarPinTemplate.offsetHeight) + 'px';

  return pinElement;
};

var init = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(renderPin(ads[i]));
  }
  similarPinList.appendChild(fragment);
};

init();
