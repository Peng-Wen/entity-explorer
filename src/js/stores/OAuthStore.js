var AppDispatcher = require('../dispatcher/AppDispatcher');
var BaseStore = require('./BaseStore');
var ACTION_CONSTANTS = require('../constants/actions');
var _ = require('lodash');

var _tokenInfo = {};

var OAuthStore = _.assign({}, BaseStore, {
  getTokenInfo: function() {
    return _.cloneDeep(_tokenInfo);
  }
});

AppDispatcher.register(function(action) {
  switch (action.type) {
    case ACTION_CONSTANTS.OAUTH_SAVE_TOKEN_INFO:
      _tokenInfo = _.cloneDeep(action.payload.tokenInfo || {});
      OAuthStore.emitChange();
      break;
  }
});

module.exports = OAuthStore;
