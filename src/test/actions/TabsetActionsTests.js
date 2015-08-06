var expect = require('expect.js');
var sinon = require('sinon');

var TabsetActions = require('../../js/actions/TabsetActions');
var AppDispatcher = require('../../js/dispatcher/AppDispatcher');
var ACTION_CONSTANTS = require('../../js/constants/actions');

describe('TabsetActions', function() {
  beforeEach(function() {
    sinon.stub(AppDispatcher, 'dispatch');
  });

  afterEach(function() {
    AppDispatcher.dispatch.restore();
  });

  describe('#addTab()', function() {
    it('should dispatch an ADD_TAB action', function() {
      TabsetActions.addTab('TestTabsetId', 'TabConfig');
      expect(AppDispatcher.dispatch.calledWithExactly({
        type: ACTION_CONSTANTS.TAB_SET_ADD_TAB,
        payload: {
          tabsetId: 'TestTabsetId',
          tab: 'TabConfig'
        }
      })).to.be(true);
    });
  });
});
