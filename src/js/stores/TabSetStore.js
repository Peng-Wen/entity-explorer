var AppDispatcher = require('../dispatcher/AppDispatcher');
var BaseStore = require('./BaseStore');
var ACTION_CONSTANTS = require('../constants/actions');
var _ = require('lodash');

// {tabSetId: {activeTabId: 'active-tab-id', tabs: []}}
var _tabsets = {};

var _tabIdCounter = 0;

function assignTabId(tab) {
  // TODO: provide more sophisticated tab format here
  tab.id = (_tabIdCounter++).toString();
}

var TabsetStore = _.assign({}, BaseStore, {
  getTabs: function(tabsetId) {
    var tabs = [];
    var tabset = _tabsets[tabsetId];

    if (tabset) {
      tabs = _.cloneDeep(tabset.tabs);
      tabs.forEach(function(tab) {
        tab.isActive = tab.id === tabset.activeTabId;
      })
    }

    return tabs;
  }
});

AppDispatcher.register(function(action) {
  switch (action.type) {
    case ACTION_CONSTANTS.TAB_SET_ADD_TAB:
      var tabsetId = action.payload.tabsetId;
      var isTabActive = action.payload.tab.isActive;
      var tabToAdd = _.cloneDeep(_.omit(action.payload.tab, 'isActive'));
      assignTabId(tabToAdd);

      if (!_tabsets[tabsetId]) {
        _tabsets[tabsetId] = {tabs: []};
      }

      _tabsets[tabsetId].tabs.push(tabToAdd);

      if (isTabActive) {
        _tabsets[tabsetId].activeTabId = tabToAdd.id;
      }
      // TODO: auto activate the tab is that tab is the only tab in the tab set?

      TabsetStore.emitChange();
      break;
    case ACTION_CONSTANTS.TAB_SET_REMOVE_TAB:
      var tabsetId = action.payload.tabsetId;
      var tabIdToDelete = action.payload.tabId;
      var tabset = _tabsets[tabsetId];

      if (tabset) {
        var removed = _.remove(tabset.tabs, function(tab) {
          return tab.id === tabIdToDelete;
        });

        if (removed.length) {
          TabsetStore.emitChange();
        }
      }

      break;
    case ACTION_CONSTANTS.TAB_SET_ACTIVATE_TAB:
      var tabsetId = action.payload.tabsetId;
      var tabIdToActivate = action.payload.tabId;
      var tabset = _tabsets[tabsetId];

      if (tabset) {
        // TODO: validate tabset ID and tab ID here?
        tabset.activeTabId = tabIdToActivate;
        TabsetStore.emitChange();
      }

      break;
  }
});

module.exports = TabsetStore;
