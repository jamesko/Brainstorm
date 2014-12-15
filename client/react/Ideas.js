app.Ideas = React.createClass({
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
    var that = this;
    // create all idea components
    this.state.ideas.forEach(function(idea) {
      if (idea.name.toLowerCase().indexOf(that.props.filterText.toLowerCase()) !== -1)
        if (idea.ownerName.toLowerCase().indexOf(that.props.filterNames.toLowerCase()) !== -1)
          ideas.push(<app.Idea name={idea.name} ownerName={idea.ownerName} owner={idea.owner} room={idea.room} key={idea._id} _id={idea._id} />);
    });
    return (

      <div ref="body">
        { ideas }
      </div>
    );
  }
})
