var React = require('React');

var Tab = require('./Tab.react');

function getTab(tabConfig) {
  return <Tab isActive={tabConfig.isActive} href={tabConfig.href}>{tabConfig.label}</Tab>;
}

var TabSet = React.createClass({
  propTypes: {
    tabs: React.PropTypes.array.isRequired
  },

  render: function() {
    return (
      <ul className="nav nav-tabs">
        {this.props.tabs.map(getTab)}
      </ul>
    );
  }
});

module.exports = TabSet;
