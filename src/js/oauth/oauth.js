var _ = require('lodash');

var OAuth = function OAuth(config) {
  // TODO: validate config
  if (!config) {
    return;
  }

  this.authEndpointUrl = config.authEndpointUrl;
  this.callbackUrl = config.callbackUrl;
  this.responseType = config.responseType;
  this.clientId = config.clientId;
};

_.assign(OAuth.prototype, {
  getFullAuthEndpointUrl: function() {
    var encodedCallbackUrl = encodeURIComponent(this.callbackUrl);
    // generate a state string which will be verified later
    this.state = Math.floor(Math.random() * 100000).toString();

    var queryParams = [
      {response_type: this.responseType},
      {client_id: this.clientId},
      {redirect_uri: this.callbackUrl},
      {state: this.state}
    ];

    queryParams = queryParams.map(function(param) {
      for (var key in param) {
        return key + '=' + param[key];
      }
    }).join('&');

    return this.authEndpointUrl + '?' + queryParams;
  },

  openUserAuthorizationPage: function() {
    window.location.href = this.getFullAuthEndpointUrl();
  },

  getTokenInfoFromUrl: function() {
    var tokenInfo = {};
    var params = window.location.hash.substr(1).split('&');
    params.forEach(function(param) {
      param = param.split('=');
      tokenInfo[param[0]] = decodeURIComponent(param[1]);
    });

    return tokenInfo.access_token ? tokenInfo : null;
  }
});

module.exports = OAuth;