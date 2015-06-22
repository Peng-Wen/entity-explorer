var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ACTION_CONSTANTS = require('../constants/actions');
var _ = require('lodash');

var CHANGE_EVENT = 'change';

var _tokenInfo = {};

var OAuthStore = _.assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  getTokenInfo: function() {
    return _.cloneDeep(_tokenInfo);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function(action) {
  switch (action.type) {
    case ACTION_CONSTANTS.OAUTH_SAVE_TOKEN_INFO:
      _tokenInfo = _.cloneDeep(action.payload.tokenInfo || {});
      OAuthStore.emitChange();
      break;
    default:
      // TODO: provide better logging / error handling
      console.log('Should not reach here! No OAuth action matched: ' + action.type);
  }
});

module.exports = OAuthStore;
