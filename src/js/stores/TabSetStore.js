var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ACTION_CONSTANTS = require('../constants/actions');
var _ = require('lodash');

var CHANGE_EVENT = 'change';

// {tabSetId: {activeTabId: 'active-tab-id', tabs: []}}
var _tabSets = {};

var _tabIdCounter = 0;

function assignTabId(tab) {
  // TODO: provide more sophisticated tab format here
  tab.id = (_tabIdCounter++).toString();
}

var TabSetStore = _.assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  getTabs: function(tabSetId) {
    var tabs = [];
    var tabSet = _tabSets[tabSetId];

    if (tabSet) {
      tabs = _.cloneDeep(tabSet.tabs);
      tabs.forEach(function(tab) {
        tab.isActive = tab.id === tabSet.activeTabId;
      })
    }

    return tabs;
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
    case ACTION_CONSTANTS.TAB_SET_ADD_TAB:
      var tabSetId = action.payload.tabSetId;
      var isTabActive = action.payload.tab.isActive;
      var tabToAdd = _.cloneDeep(_.omit(action.payload.tab, 'isActive'));
      assignTabId(tabToAdd);

      if (!_tabSets[tabSetId]) {
        _tabSets[tabSetId] = {tabs: []};
      }

      _tabSets[tabSetId].tabs.push(tabToAdd);

      if (isTabActive) {
        _tabSets[tabSetId].activeTabId = tabToAdd.id;
      }
      // TODO: auto activate the tab is that tab is the only tab in the tab set?

      TabSetStore.emitChange();
      break;
    case ACTION_CONSTANTS.TAB_SET_REMOVE_TAB:
      var tabSetId = action.payload.tabSetId;
      var tabIdToDelete = action.payload.tabId;
      var tabSet = _tabSets[tabSetId];

      if (tabSet) {
        var removed = _.remove(tabSet.tabs, function(tab) {
          return tab.id === tabIdToDelete;
        });

        if (removed.length) {
          TabSetStore.emitChange();
        }
      }

      break;
    case ACTION_CONSTANTS.TAB_SET_ACTIVATE_TAB:
      var tabSetId = action.payload.tabSetId;
      var tabIdToActivate = action.payload.tabId;
      var tabSet = _tabSets[tabSetId];

      if (tabSet) {
        // TODO: validate tab set ID and tab ID here?
        tabSet.activeTabId = tabIdToActivate;
        TabSetStore.emitChange();
      }

      break;
    default:
      // TODO: provide better logging / error handling
      console.log('Should not reach here! No TabSet action matched: ' + action.type);
  }
});

module.exports = TabSetStore;
