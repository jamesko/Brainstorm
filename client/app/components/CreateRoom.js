var React = require("react");
var RoomCreateForm = require("./RoomCreateForm");

var CreateRoom = React.createClass({
  render: function(){
    return (
      <div>
        <RoomCreateForm />
      </div>
    );
  }
});

module.exports = CreateRoom;
