var React = require('react');
var classnames = require('classnames');

var ComponentIdMixin = require('../mixins/ComponentIdMixin');

var Tab = React.createClass({
  mixins: [ComponentIdMixin],

  propTypes: {
    isActive: React.PropTypes.bool,
    href: React.PropTypes.string
  },

  render: function() {
    var className = classnames({
      active: this.props.isActive
    });

    return <li role="presentation" className={className}><a href={this.props.href}>{this.props.children}</a></li>;
  }
});

module.exports = Tab;
