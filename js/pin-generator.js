'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');
  var templateMapPin = document.querySelector('#pin').content.querySelector('.map__pin');
  var templateError = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');

  var renderPin = function (ad) {
    var pinElement = templateMapPin.cloneNode(true);

    pinElement.querySelector('img').src = ad.author.avatar;
    pinElement.querySelector('img').alt = ad.offer.title;
    pinElement.style.left = (ad.location.x + (templateMapPin.offsetWidth / 2)) + 'px';
    pinElement.style.top = (ad.location.y + templateMapPin.offsetHeight) + 'px';

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

  var init = function (pins) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(renderPin(pins[i]));
    }
    mapPins.appendChild(fragment);
  };

  window.pinGenerator = {
    init: init,
    showError: showError,
  };
})();
