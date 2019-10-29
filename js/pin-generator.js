'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');
  var templateMapPin = document.querySelector('#pin').content.querySelector('.map__pin');
  var templateError = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');
  var mapFiltersContainer = main.querySelector('.map__filters-container');

  var renderPin = function (ad) {
    var pinElement = templateMapPin.cloneNode(true);

    pinElement.querySelector('img').src = ad.author.avatar;
    pinElement.querySelector('img').alt = ad.offer.title;
    pinElement.style.left = (ad.location.x + (templateMapPin.offsetWidth / 2)) + 'px';
    pinElement.style.top = (ad.location.y + templateMapPin.offsetHeight) + 'px';

    pinElement.addEventListener('click', function () {
      mapFiltersContainer.before(window.cardGenerator.renderCard(ad));
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

  var pasteToDOM = function (renderFunc, obj) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < obj.length; i++) {
      fragment.appendChild(renderFunc(obj[i]));
    }

    return fragment;
  };

  var init = function (pins) {
    mapPins.appendChild(pasteToDOM(renderPin, pins));
    mapFiltersContainer.before(window.cardGenerator.renderCard(pins[0]));
  };

  window.pinGenerator = {
    pasteToDOM: pasteToDOM,
    init: init,
    showError: showError,
  };
})();
