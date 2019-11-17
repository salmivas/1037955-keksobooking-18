'use strict';
(function () {
  var Adress = {
    AUTH_URL: 'https://js.dump.academy/keksobooking',
    DATA_URL: 'https://js.dump.academy/keksobooking/data',
  };

  var HttpRequestType = {
    Post: 'POST',
    Get: 'GET'
  };

  var SUCCESS_STATUS = 200;

  var get = function (onLoad, onError) {
    var xhr = createRequestInstance(onLoad, onError);

    xhr.open(HttpRequestType.Get, Adress.DATA_URL);
    xhr.send();
  };

  var post = function (onLoad, onError, data) {
    var xhr = createRequestInstance(onLoad, onError);

    xhr.open(HttpRequestType.Post, Adress.AUTH_URL);
    xhr.send(data);
  };

  var createRequestInstance = function (onLoad, onError) {
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
    get: get,
    post: post,
  };
})();
