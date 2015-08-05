var AppDispatcher = require('../dispatcher/AppDispatcher');
var BaseStore = require('./BaseStore');
var ACTION_CONSTANTS = require('../constants/actions');
var _ = require('lodash');

var _userInfo = {};

var UserInfoStore = _.assign({}, BaseStore, {
  getUserInfo: function() {
    return _.cloneDeep(_userInfo);
  }
});

AppDispatcher.register(function(action) {
  switch (action.type) {
    case ACTION_CONSTANTS.USER_INFO_SAVE_USER_INFO:
      _userInfo = _.cloneDeep(action.payload.userInfo || {});
      UserInfoStore.emitChange();
      break;
  }
});

module.exports = UserInfoStore;
