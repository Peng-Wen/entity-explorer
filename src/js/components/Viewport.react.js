var React = require('react');

var MainPanel = require('./MainPanel.react');
var Sidebar = require('./Sidebar.react');

var Viewport = React.createClass({
  render: function() {
    return (
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <MainPanel />
        </div>
      </div>
    );
  }
});

module.exports = Viewport;
