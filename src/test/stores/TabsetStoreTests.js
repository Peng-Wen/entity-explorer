var expect = require('expect.js');

var TabsetActions = require('../../js/actions/TabsetActions');
var TabsetStore = require('../../js/stores/TabsetStore');

describe('TabsetStore', function() {
  describe('#getTabs()', function() {
    it('should return all tabs in store', function() {
      TabsetActions.addTab('test-tabset', {
        label: 'tab1',
        href: 'tab1_path',
        isActive: true
      });

      expect(TabsetStore.getTabs('test-tabset')).to.eql([{
        id: '0',
        label: 'tab1',
        href: 'tab1_path',
        isActive: true
      }]);
    });
  });
});
