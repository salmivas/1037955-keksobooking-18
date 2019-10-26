'use strict';
(function () {
  var Adress = {
    AUTH_URL: 'https://js.dump.academy/code-and-magick',
    DATA_URL: 'https://js.dump.academy/keksobooking/data',
  };

  var SUCCESS_STATUS = 200;

  var load = function (onLoad, onError) {
    var xhr = request(onLoad, onError);

    xhr.open('GET', Adress.DATA_URL);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = request(onLoad, onError);

    xhr.open('POST', Adress.AUTH_URL);
    xhr.send(data);
  };

  var request = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_STATUS) {
        onLoad(xhr.response);
      } else {
        onError();
      }
    });

    return xhr;
  };

  window.backend = {
    load: load,
    save: save,
  };
})();
