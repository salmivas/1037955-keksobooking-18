'use strict';

(function () {
  var templateCard = document.querySelector('#card').content.querySelector('.map__card');
  var housesType = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
  };

  var renderFeatures = function (ad) {
    var fragment = document.createDocumentFragment();
    var incomeFeatures = ad.offer.features;

    for (var i = 0; i < incomeFeatures.length; i++) {
      var node = document.createElement('li');
      node.classList.add('popup__feature');
      node.classList.add('popup__feature--' + incomeFeatures[i]);
      fragment.appendChild(node);
    }

    return fragment;
  };

  var renderPhotos = function (ad, popupPhoto) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < ad.offer.photos.length; i++) {
      var newPhoto = popupPhoto.cloneNode(true);
      newPhoto.src = ad.offer.photos[i];
      fragment.appendChild(newPhoto);
    }

    return fragment;
  };

  var renderCard = function (ad) {
    var cardElement = templateCard.cloneNode(true);
    var features = cardElement.querySelector('.popup__features');
    var photos = cardElement.querySelector('.popup__photos');
    var popupPhoto = cardElement.querySelector('.popup__photo');
    var button = cardElement.querySelector('.popup__close');

    cardElement.querySelector('.popup__title').textContent = ad.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = housesType[ad.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей.';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ' , выезд до ' + ad.offer.checkout;
    features.innerHTML = '';
    features.appendChild(renderFeatures(ad));
    cardElement.querySelector('.popup__description').textContent = ad.offer.description;
    photos.innerHTML = '';
    photos.appendChild(renderPhotos(ad, popupPhoto));
    cardElement.querySelector('.popup__avatar').src = ad.author.avatar;

    button.addEventListener('click', function () {
      cardElement.remove();
      window.pinGenerator.removeActivePins(document.querySelectorAll('.map__pin'));
    });

    return cardElement;
  };

  window.cardGenerator = {
    renderCard: renderCard,
  };
})();
