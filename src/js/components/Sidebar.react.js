var React = require('react');

var ListView = require('./ListView.react');

var Sidebar = React.createClass({
  getInitialState: function() {
    return {
      entities: [{name: '#1', id: 1}, {name: '#2', id: 2}, {name: '#3', id: 3}]
    };
  },

  render: function() {
    return (
      <div className="col-sm-3 col-md-2 sidebar">
        <ul className="nav nav-sidebar">
          <li className="active"><a href="#">Overview <span className="sr-only">(current)</span></a></li>
          <li><a href="#">Reports</a></li>
          <li><a href="#">Analytics</a></li>
          <li><a href="#">Export</a></li>
        </ul>
        <ListView entities={this.state.entities} />
      </div>
    );
  }
});

module.exports = Sidebar;
