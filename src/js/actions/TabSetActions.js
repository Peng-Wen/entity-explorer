var AppDispatcher = require('../dispatcher/AppDispatcher');
var ACTION_CONSTANTS = require('../constants/actions');

var TabsetActions = {
  addTab: function(tabsetId, tab) {
    AppDispatcher.dispatch({
      type: ACTION_CONSTANTS.TAB_SET_ADD_TAB,
      payload: {
        tabsetId: tabsetId,
        tab: tab
      }
    });
  },

  removeTab: function(tabsetId, tabId) {
    AppDispatcher.dispatch({
      type: ACTION_CONSTANTS.TAB_SET_REMOVE_TAB,
      payload: {
        tabsetId: tabsetId,
        tabId: tabId
      }
    });
  },

  activateTab: function(tabsetId, tabId) {
    AppDispatcher.dispatch({
      type: ACTION_CONSTANTS.TAB_SET_ACTIVATE_TAB,
      payload: {
        tabsetId: tabsetId,
        tabId: tabId
      }
    });
  }
};

module.exports = TabsetActions;
