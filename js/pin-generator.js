'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');
  var templateMapPin = document.querySelector('#pin').content.querySelector('.map__pin');
  var templateError = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');
  var mapFiltersContainer = main.querySelector('.map__filters-container');

  var removeExistentCard = function () {
    var mapCard = main.querySelector('.map__card');
    if (main.contains(mapCard)) {
      mapCard.remove();
    }
  };

  var removeActivePins = function (list) {
    for (var i = 0; i < list.length; i++) {
      if (list.item(i).classList.contains('map__pin--active')) {
        list.item(i).classList.remove('map__pin--active');
      }
    }
  };

  var renderPin = function (ad) {
    var pinElement = templateMapPin.cloneNode(true);

    pinElement.querySelector('img').src = ad.author.avatar;
    pinElement.querySelector('img').alt = ad.offer.title;
    pinElement.style.left = (ad.location.x + (templateMapPin.offsetWidth / 2)) + 'px';
    pinElement.style.top = (ad.location.y + templateMapPin.offsetHeight) + 'px';

    pinElement.addEventListener('click', function () {
      removeActivePins(main.querySelectorAll('.map__pin'));
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

  var pasteToDOM = function (renderFunc, obj) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < obj.length; i++) {
      fragment.appendChild(renderFunc(obj[i]));
    }

    return fragment;
  };

  var init = function (pins) {
    mapPins.appendChild(pasteToDOM(renderPin, pins));
  };

  window.pinGenerator = {
    pasteToDOM: pasteToDOM,
    init: init,
    showError: showError,
    removeActivePins: removeActivePins,
  };
})();
