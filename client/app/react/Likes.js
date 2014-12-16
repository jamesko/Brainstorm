app.Ideas = React.createClass({displayName: 'Ideas',
  getInitialState: function () {
    return {
      ideas: app.IdeaStore.getAll()
    };
  },

  componentDidMount: function () {
    app.IdeaStore.addChangeListener(function() {
      if(this.isMounted()) {
        this.setState({ ideas: app.IdeaStore.getAll() });
      }
    }.bind(this));
    // get all ideas from db
  },

  render: function() {
    var ideas = [];
    // create all idea components
    this.state.ideas.forEach(function(idea) {
      ideas.push(React.createElement(app.Idea, {name: idea.name, ownerName: idea.ownerName, owner: idea.owner, room: idea.room, key: idea._id, _id: idea._id}));
    });
    return (
      React.createElement("div", {className: "my-likes"}, 
        ideas 
      )
    );
  }
})