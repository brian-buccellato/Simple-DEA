var csApi = (function  () {

  var api = {},
      baseUrl = 'https://dea.staging.credsimple.com',
      path = '/v1/clients_providers/'
      token = '3ad6aef59ee542ec881c5bc6593ba9c3',
      id = 20;

  api.getData = function(callback) {
    var requestUrl = baseUrl + path + id + '?token=' + token;
    var request = new XMLHttpRequest();
    request.open('GET', requestUrl, true);
    request.onload = function(e) {
      var response = request.response;
      response = JSON.parse(response);
      callback(response);
    };
    request.onerror = function(e) {
      callback(request.response, e);
    };
    request.send();
  };
  return api;
})();
