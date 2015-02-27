var React = require("react");
var RoomCreateForm = require("./RoomCreateForm");
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var CreateRoom = React.createClass({

  mixins: [PureRenderMixin],

  render: function(){
    return (
      <div>
        <RoomCreateForm />
      </div>
    );
  }
});

module.exports = CreateRoom;
