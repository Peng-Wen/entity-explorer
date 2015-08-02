var React = require('react');

// Components
var AccountConnect = require('./AccountConnect.react');
var ListView = require('./ListView.react');
var Tabset = require('./Tabset.react');

// Actions
var OAuthActions = require('../actions/OAuthActions');
var UserInfoActions = require('../actions/UserInfoActions');
var TabsetActions = require('../actions/TabsetActions');

// Stores
var OAuthStore = require('../stores/OAuthStore');
var TabsetStore = require('../stores/TabsetStore');

// Utilities
var OAuth = require('../oauth/oauth');

var TAB_SET_ID = 'primary-tabs';

var App = React.createClass({
  getInitialState: function() {
    return {
      entities: [{name: '#1', id: 1}, {name: '#2', id: 2}, {name: '#3', id: 3}],
      tabs: TabsetStore.getTabs(TAB_SET_ID)
    };
  },

  handleOAuthTokenInfoChange: function() {
    UserInfoActions.fetchUserInfo();
  },

  handleTabsetChange: function() {
    var tabs = TabsetStore.getTabs(TAB_SET_ID);
    this.setState({tabs: tabs});
  },

  componentWillMount: function() {
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

    this.setState({tabs: TabsetStore.getTabs(TAB_SET_ID)});
  },

  componentDidMount: function() {
    OAuthStore.addChangeListener(this.handleOAuthTokenInfoChange);

    // grab token info from the current URL if present
    var tokenInfo = new OAuth().getTokenInfoFromUrl();
    if (tokenInfo) {
      console.log(tokenInfo);
      OAuthActions.saveTokenInfo(tokenInfo);
    }

    TabsetStore.addChangeListener(this.handleTabsetChange);
  },

  componentWillUnmount: function() {
    OAuthStore.removeChangeListener(this.handleOAuthTokenInfoChange);
    TabsetStore.removeChangeListener(this.handleTabsetChange);
  },

  addTab: function() {
    TabsetActions.addTab(TAB_SET_ID, {
      isActive: false,
      label: 'Custom',
      href: '#'
    });
  },

  removeTab: function() {
    TabsetActions.removeTab(TAB_SET_ID, '1');
  },

  render: function() {
    return (
      <div>
        <AccountConnect />
        <ListView entities={this.state.entities} />
        <Tabset id="primary-tabs" tabs={this.state.tabs} />
        <button onClick={this.addTab}>Add Tab</button>
        <button onClick={this.removeTab}>Remove Tab</button>
      </div>
    );
  }
});

module.exports = App;
