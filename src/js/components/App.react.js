var React = require('react');
var ListView = require('./ListView.react');
var AccountConnect = require('./AccountConnect.react');
var OAuthActions = require('../actions/OAuthActions');
var OAuthStore = require('../stores/OAuthStore');
var OAuth = require('../oauth/oauth');
var UserInfoActions = require('../actions/UserInfoActions');
var TabSet = require('./TabSet.react');

var App = React.createClass({
  getInitialState: function() {
    return {entities: [{name: '#1', id: 1}, {name: '#2', id: 2}, {name: '#3', id: 3}]};
  },

  handleOAuthTokenInfoChange: function() {
    UserInfoActions.fetchUserInfo();
  },

  componentDidMount: function() {
    OAuthStore.addChangeListener(this.handleOAuthTokenInfoChange);

    // grab token info from the current URL if present
    var tokenInfo = new OAuth().getTokenInfoFromUrl();
    if (tokenInfo) {
      console.log(tokenInfo);
      OAuthActions.saveTokenInfo(tokenInfo);
    }
  },

  componentWillUnmount: function() {
    OAuthStore.removeChangeListener(this.handleOAuthTokenInfoChange);
  },


  render: function() {
    var tabs = [
      {
        isActive: false,
        label: 'Account',
        href: 'http://www.salesforce.com'
      },
      {
        isActive: true,
        label: 'Case',
        href: 'http://www.salesforce.com'
      },
      {
        isActive: false,
        label: 'Lead',
        href: 'http://www.salesforce.com'
      }
    ];

    return (
      <div>
        <AccountConnect />
        <ListView entities={this.state.entities} />
        <TabSet tabs={tabs} />
      </div>
    );
  }
});

module.exports = App;
