var React = require('React');

// Components
var Tab = require('./Tab.react');

// Actions
var TabSetActions = require('../actions/TabSetActions');

function getTab(tabConfig) {
  var onClickHandler = function() {
    TabSetActions.activateTab(this.props.id, tabConfig.id);
  }.bind(this);

  return <Tab onClick={onClickHandler} id={tabConfig.id} isActive={tabConfig.isActive} href={tabConfig.href}>{tabConfig.label}</Tab>;
}

var TabSet = React.createClass({
  propTypes: {
    id: React.PropTypes.string.isRequired,
    tabs: React.PropTypes.array.isRequired
  },

  render: function() {
    return (
      <ul className="nav nav-tabs">
        {this.props.tabs.map(getTab, this)}
      </ul>
    );
  }
});

module.exports = TabSet;
