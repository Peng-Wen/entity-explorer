var React = require('react');
var classnames = require('classnames');

var TabsetActions = require('../actions/TabsetActions');

var Tab = React.createClass({
  propTypes: {
    id: React.PropTypes.string.isRequired,
    tabsetId: React.PropTypes.string.isRequired,
    isActive: React.PropTypes.bool,
    href: React.PropTypes.string
  },

  handleClick: function() {
    TabsetActions.activateTab(this.props.tabsetId, this.props.id);
  },

  handleRemove: function() {
    TabsetActions.removeTab(this.props.tabsetId, this.props.id);
  },

  render: function() {
    var className = classnames({
      active: this.props.isActive
    });

    return (
      <li role="presentation" onClick={this.handleClick} className={className}>
        <a href={this.props.href}>
          {this.props.children}
          <button type="button" className="close" style={{marginLeft: '0.3em', lineHeight: '0.8'}} onClick={this.handleRemove} aria-label="Close"><span aria-hidden="true">&times;</span></button>
        </a>
      </li>
    );
  }
});

module.exports = Tab;
