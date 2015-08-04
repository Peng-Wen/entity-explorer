var React = require('react');

// Components
var Tabset = require('./Tabset.react');

// Stores
var TabsetStore = require('../stores/TabsetStore');

var TAB_SET_ID = 'primary-tabs';

var MainPanel = React.createClass({
  getInitialState: function() {
    return {
      tabs: TabsetStore.getTabs(TAB_SET_ID)
    }
  },

  handleTabsetChange: function() {
    var tabs = TabsetStore.getTabs(TAB_SET_ID);
    this.setState({tabs: tabs});
  },

  componentDidMount: function() {
    TabsetStore.addChangeListener(this.handleTabsetChange);
  },

  componentWillUnmount: function() {
    TabsetStore.removeChangeListener(this.handleTabsetChange);
  },

  render: function() {
    return (
      <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
        <h1 className="page-header">Dashboard</h1>
        <Tabset id="primary-tabs" tabs={this.state.tabs} />
        <h2 className="sub-header">Section title</h2>
      </div>
    );
  }
});

module.exports = MainPanel;
