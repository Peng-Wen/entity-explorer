var React = require('react');
var OAuth = require('../oauth/oauth');
var UserInfoStore = require('../stores/UserInfoStore');

var AUTHORIZATION_ENDPOINT_URL = 'https://login.salesforce.com/services/oauth2/authorize';
var CALLBACK_URL = 'http://localhost:8080/index.html';
var RESPONSE_TYPE = 'token';
var CLIENT_ID = '3MVG9sG9Z3Q1Rlbeui1IQnNMC.A3invGDWRO3bxhJnOriN7Q54ACAzD2tV0ZQUZvglKgdlaPC5z9w6a4isrpd';

var oauth = new OAuth({
  authEndpointUrl: AUTHORIZATION_ENDPOINT_URL,
  callbackUrl: CALLBACK_URL,
  responseType: RESPONSE_TYPE,
  clientId: CLIENT_ID
});

var AccountConnect = React.createClass({
  getInitialState: function() {
    return {userName: ''};
  },

  handleClick: function() {
    oauth.openUserAuthorizationPage();
  },

  handleUserInfoChange: function() {
    var userInfo = UserInfoStore.getUserInfo();
    if (userInfo.Username) {
      this.setState({userName: userInfo.Username});
    }
  },

  componentDidMount: function() {
    UserInfoStore.addChangeListener(this.handleUserInfoChange);
  },

  componentWillUnmount: function() {
    UserInfoStore.removeChangeListener(this.handleUserInfoChange);
  },

  render: function() {
    return this.state.userName ? (
      <span>{this.state.userName}</span>
    ) : (
      <button onClick={this.handleClick}>Connect to SFDC</button>
    );
  }
});

module.exports = AccountConnect;
