var React = require('react');

// Components
var AccountConnect = require('./AccountConnect.react');

// Actions
var OAuthActions = require('../actions/OAuthActions');
var UserInfoActions = require('../actions/UserInfoActions');

// Stores
var OAuthStore = require('../stores/OAuthStore');

// Utilities
var OAuth = require('../oauth/oauth');

var Header = React.createClass({
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
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">Project name</a>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav navbar-right">
              <li><a href="#">Dashboard</a></li>
              <li><a href="#">Settings</a></li>
              <li><a href="#">Profile</a></li>
              <li><a href="#">Help</a></li>
              <AccountConnect />
            </ul>
            <form className="navbar-form navbar-right">
              <input type="text" className="form-control" placeholder="Search..."></input>
            </form>
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = Header;
