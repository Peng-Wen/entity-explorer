var React = require('React');

// Components
var Tab = require('./Tab.react');

// Actions
var TabsetActions = require('../actions/TabsetActions');

function getTab(tabConfig) {
  return <Tab tabsetId={this.props.id} id={tabConfig.id} isActive={tabConfig.isActive} href={tabConfig.href}>{tabConfig.label}</Tab>;
}

var Tabset = React.createClass({
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

module.exports = Tabset;
