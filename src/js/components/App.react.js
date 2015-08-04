var React = require('react');

// Components
var Header = require('./Header.react');
var Viewport = require('./Viewport.react');

// Actions
var TabsetActions = require('../actions/TabsetActions');

// Stores
var TabsetStore = require('../stores/TabsetStore');

var TAB_SET_ID = 'primary-tabs';

var App = React.createClass({
  componentWillMount: function() {
    // TODO: provide better store init logic
    TabsetActions.addTab(TAB_SET_ID, {
      isActive: true,
      label: 'Account',
      href: '#'
    });

    TabsetActions.addTab(TAB_SET_ID, {
      isActive: true,
      label: 'Case',
      href: '#'
    });

    TabsetActions.addTab(TAB_SET_ID, {
      isActive: true,
      label: 'Lead',
      href: '#'
    });
  },

  render: function() {
    return (
      <div>
        <Header />
        <Viewport />
      </div>
    );
  }
});

module.exports = App;
