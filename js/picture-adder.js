'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var avatarImageChooser = document.querySelector('#avatar');
  var housingImageChooser = document.querySelector('#images');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var adFormPhoto = document.querySelector('.ad-form__photo');
  var adFormPhotoContainer = document.querySelector('.ad-form__photo-container');

  var chooseAvatar = function () {
    var file = avatarImageChooser.files[0];
    if (file) {
      var matches = FILE_TYPES.some(function (it) {
        return file.name.toLowerCase().endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          avatarPreview.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    }
  };

  var renderHousingImage = function () {
    var divElement = document.createElement('div');
    var imgElement = document.createElement('img');

    divElement.classList.add('ad-form__photo');
    divElement.append(imgElement);

    return divElement;
  };

  var chooseHousingImage = function () {
    var file = housingImageChooser.files[0];
    if (file) {
      var matches = FILE_TYPES.some(function (it) {
        return file.name.toLowerCase().endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          if (adFormPhoto.innerHTML !== '') {
            var photo = renderHousingImage();
            var photoImage = photo.querySelector('img');
            photoImage.src = reader.result;
            adFormPhotoContainer.append(photo);
          } else {
            var imgElement = document.createElement('img');
            imgElement.src = reader.result;
            adFormPhoto.append(imgElement);
          }
        });

        reader.readAsDataURL(file);
      }
    }
  };

  avatarImageChooser.addEventListener('change', chooseAvatar);
  housingImageChooser.addEventListener('change', chooseHousingImage);

})();
