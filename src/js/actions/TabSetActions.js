var AppDispatcher = require('../dispatcher/AppDispatcher');
var ACTION_CONSTANTS = require('../constants/actions');

var TabSetActions = {
  addTab: function(tabSetId, tab) {
    AppDispatcher.dispatch({
      type: ACTION_CONSTANTS.TAB_SET_ADD_TAB,
      payload: {
        tabSetId: tabSetId,
        tab: tab
      }
    });
  },

  removeTab: function(tabSetId, tabId) {
    AppDispatcher.dispatch({
      type: ACTION_CONSTANTS.TAB_SET_REMOVE_TAB,
      payload: {
        tabSetId: tabSetId,
        tabId: tabId
      }
    });
  },

  activateTab: function(tabSetId, tabId) {
    AppDispatcher.dispatch({
      type: ACTION_CONSTANTS.TAB_SET_ACTIVATE_TAB,
      payload: {
        tabSetId: tabSetId,
        tabId: tabId
      }
    });
  }
};

module.exports = TabSetActions;
