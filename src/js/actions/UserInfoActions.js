var AppDispatcher = require('../dispatcher/AppDispatcher');
var ACTION_CONSTANTS = require('../constants/actions');
var OAuthStore = require('../stores/OAuthStore');
var request = require('superagent');

var UserInfoActions = {
  fetchUserInfo: function(tokenInfo) {
    var tokenInfo = OAuthStore.getTokenInfo();
    var idParts = tokenInfo.id.split('/');
    var userId = idParts[idParts.length - 1];
    request.get('https://na24.salesforce.com/services/data/v20.0/sobjects/User/' + userId)
      .set('Authorization', 'Bearer ' + tokenInfo.access_token)
      .end(function(err, res) {
        AppDispatcher.dispatch({
          type: ACTION_CONSTANTS.USER_INFO_SAVE_USER_INFO,
          payload: {
            userInfo: res.body
          }
        });
      });
  }
};

module.exports = UserInfoActions;
