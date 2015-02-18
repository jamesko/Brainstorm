var React = require("react");
var RoomActions = require("../actions/RoomActions");

var RoomCreateForm = React.createClass({
  // handleSubmit: function(e) {
  //   e.preventDefault();

  //   var roomName = this.refs.name.getDOMNode();

  //   app.RoomActions.create(roomName.value.trim());
  //   roomName.value = '';
  //   return;
  // },
  handleSubmit: function(e) {
    e.preventDefault();

    var name = this.refs.name.getDOMNode();



    // if editing send info to edit method in IdeaActions
    if (this.props.editing) {
      // console.log('wtf')
      // debugger
      var room = {id: this.props._id};
      room.owner = this.props.owner;
      room.name = name.value.trim();
      RoomActions.edit(room);
    } else { // else an idea is being created
      RoomActions.create(name.value.trim());
    }
    // clear the value in the input
    name.value = '';
    return;
  },

  render: function(){
    return (
      <form className="auth-check pure-form pure-g" ref="form" onSubmit={this.handleSubmit}>
        <input className="pure-u-1-1 pure-u-sm-5-6 postfix" type="text" ref="name" defaultValue={this.props.name} placeholder="Create a Room" />
        <button className="pure-u-1-1 pure-u-sm-1-6 button-small pure-button pure-button-primary no-margin" type="submit" ref="submit" >{this.props.editing ? "Edit Idea" : "Create"}</button>
      </form>
    );
  }
});

module.exports = RoomCreateForm;