app.Room = React.createClass({displayName: 'Room',

  gotoRoom: function(e){
    e.preventDefault();
    app.PageActions.navigate({
      dest: 'rooms',
      props: this.props._id
    });
  },

  render: function() {
    return (
      React.createElement("div", {className: "room pure-u-1"}, 
          React.createElement("a", {href: "#", onClick: this.gotoRoom}, this.props.name)
      )
    );
  }
});