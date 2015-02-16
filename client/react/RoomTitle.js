var React = require("react");

var RoomTitle = React.createClass({
  getInitialState: function() {
    return {
      room:
      _(app.RoomStore.getAll()).filter(function (room) {
        return room._id === this.props.room_id;
      },this)[0]
    };
  },

  componentDidMount: function() {
    app.RoomStore.addChangeListener(function() {
      if(this.isMounted()) {
        this.setState({ room:
          _(app.RoomStore.getAll()).filter(function (room) {
            return room._id === this.props.room_id;
          },this)[0]
        });
      }
    }.bind(this));
    app.RoomStore.all();
  },

  render: function() {
    var title;
    if (this.state.room){
      title = (
        <div>
            <h1>{ this.state.room.name }</h1>
            <div style={{display:"inline", float:"right"}}>
              <a href="http://hangouts.google.com/start" target = "_blank">Start Google Hangout Click Here</a>
              <div className = "gray">
                post hangout in comments of idea you want to discuss
              </div>
            </div>
        </div>
      )
    }

    return (
      <div className="room roomTitle">
        {title}
      </div>
    );
  }
});

module.exports = RoomTitle;
