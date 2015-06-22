var React = require('react');
var ListItem = require('./ListItem.react');

var ListView = React.createClass({
  getInitialState: function() {
    return {data: [1, 2, 3]};
  },

  render: function() {
    var createItem = function(entity) {
      return <ListItem key={'item-' + entity.id} entity={entity} />;
    };

    var test = this.state.data;

    return (
      <table>
        <tbody>
          <th>
            Name
          </th>
          {this.props.entities.map(createItem)}
        </tbody>
      </table>
    );
  }
});

module.exports = ListView;
