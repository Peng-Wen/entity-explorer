var React = require('react');

var ListItem = React.createClass({
  render: function() {
    return (
      <tr>
        <td>
          {this.props.entity.name}
        </td>
      </tr>);
  }
});

module.exports = ListItem;
