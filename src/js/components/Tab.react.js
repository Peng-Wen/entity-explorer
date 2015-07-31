var React = require('react');
var classnames = require('classnames');

var TabSetActions = require('../actions/TabSetActions');

var Tab = React.createClass({
  propTypes: {
    id: React.PropTypes.string.isRequired,
    isActive: React.PropTypes.bool,
    href: React.PropTypes.string
  },

  // handleClick: function() {
  //   TabSetActions.activateTab('primary-tabs', this.props.id);
  // },

  render: function() {
    var className = classnames({
      active: this.props.isActive
    });

    return <li role="presentation" className={className} onClick={this.props.onClick}><a href={this.props.href}>{this.props.children}</a></li>;
  }
});

module.exports = Tab;
