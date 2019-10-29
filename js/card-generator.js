'use strict';

(function () {
  var templateCard = document.querySelector('#card').content.querySelector('.map__card');

  var renderCard = function (ad) {
    var cardElement = templateCard.cloneNode(true);
    var features = cardElement.querySelector('.popup__features');
    var photos = cardElement.querySelector('.popup__photos');
    var popupPhoto = cardElement.querySelector('.popup__photo');

    cardElement.querySelector('.popup__title').innerText = ad.offer.title;
    cardElement.querySelector('.popup__text--address').innerText = ad.offer.address;
    cardElement.querySelector('.popup__text--price').innerText = ad.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').innerText = function () {
      var typeName;
      switch (ad.offer.type) {
        case 'flat':
          typeName = 'Квартира';
          break;
        case 'bungalo':
          typeName = 'Бунгало';
          break;
        case 'house':
          typeName = 'Дом';
          break;
        case 'palace':
          typeName = 'Дворец';
          break;
        default:
          break;
      }
      return typeName;
    }();
    cardElement.querySelector('.popup__text--capacity').innerText = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей.';
    cardElement.querySelector('.popup__text--time').innerText = 'Заезд после ' + ad.offer.checkin + ' , выезд до ' + ad.offer.checkout;
    features.appendChild(function () {
      var fragment = document.createDocumentFragment();
      features.innerHTML = '';
      var incomeFeatures = ad.offer.features;

      for (var i = 0; i < incomeFeatures.length; i++) {
        var node = document.createElement('li');
        node.classList.add('popup__feature');
        switch (incomeFeatures[i]) {
          case 'wifi':
            node.classList.add('popup__feature--wifi');
            fragment.appendChild(node);
            break;
          case 'dishwasher':
            node.classList.add('popup__feature--dishwasher');
            fragment.appendChild(node);
            break;
          case 'parking':
            node.classList.add('popup__feature--parking');
            fragment.appendChild(node);
            break;
          case 'washer':
            node.classList.add('popup__feature--washer');
            fragment.appendChild(node);
            break;
          case 'elevator':
            node.classList.add('popup__feature--elevator');
            fragment.appendChild(node);
            break;
          case 'conditioner':
            node.classList.add('popup__feature--conditioner');
            fragment.appendChild(node);
            break;
          default:
            break;
        }
      }
      return fragment;
    }());
    cardElement.querySelector('.popup__description').innerText = ad.offer.description;
    photos.appendChild(function () {
      var fragment = document.createDocumentFragment();
      photos.innerHTML = '';

      for (var i = 0; i < ad.offer.photos.length; i++) {
        var newPhoto = popupPhoto.cloneNode(true);
        newPhoto.src = ad.offer.photos[i];
        fragment.appendChild(newPhoto);
      }
      return fragment;
    }());
    cardElement.querySelector('.popup__avatar').src = ad.author.avatar;

    return cardElement;
  };

  window.cardGenerator = {
    renderCard: renderCard,
  };
})();
