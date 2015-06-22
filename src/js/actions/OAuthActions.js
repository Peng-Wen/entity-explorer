var AppDispatcher = require('../dispatcher/AppDispatcher');
var ACTION_CONSTANTS = require('../constants/actions');

var OAuthActions = {
  saveTokenInfo: function(tokenInfo) {
    AppDispatcher.dispatch({
      type: ACTION_CONSTANTS.OAUTH_SAVE_TOKEN_INFO,
      payload: {
        tokenInfo: tokenInfo
      }
    })
  }
};

module.exports = OAuthActions;
