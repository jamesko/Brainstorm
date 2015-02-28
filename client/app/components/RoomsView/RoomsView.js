var React = require("react");
var RoomCreateForm = require("./RoomsViewComponents/RoomCreateForm");
var Rooms = require("./RoomsViewComponents/Rooms");

var RoomsView = React.createClass({
  render: function() {
    return (
      <div>
        <RoomCreateForm />
        <Rooms />
      </div>
    )
  }
});

module.exports = RoomsView;
