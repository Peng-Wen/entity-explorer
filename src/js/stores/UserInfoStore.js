var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ACTION_CONSTANTS = require('../constants/actions');
var _ = require('lodash');

var CHANGE_EVENT = 'change';

var _userInfo = {};

var UserInfoStore = _.assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  getUserInfo: function() {
    return _.cloneDeep(_userInfo);
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
    case ACTION_CONSTANTS.USER_INFO_SAVE_USER_INFO:
      _userInfo = _.cloneDeep(action.payload.userInfo || {});
      UserInfoStore.emitChange();
      break;
    default:
      // TODO: provide better logging / error handling
      console.log('Should not reach here! No UserInfo action matched: ' + action.type);
  }
});

module.exports = UserInfoStore;
