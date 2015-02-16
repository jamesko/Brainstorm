var React = require("react");
var Idea = require("./Idea");
var IdeaStore = require("../stores/IdeaStore");

var Ideas = React.createClass({
  getInitialState: function () {
    return {
      ideas: IdeaStore.getAll()
    };
  },

  pauseUpdates: false,

  componentDidMount: function () {
    var that = this;
    IdeaStore.addChangeListener(function() {
      if(this.isMounted()) {
        if(!that.pauseUpdates){
          this.setState({ ideas: IdeaStore.getAll() });
        }
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
          ideas.push(<Idea name={idea.name} ownerName={idea.ownerName} owner={idea.owner} room={idea.room} key={idea._id} _id={idea._id} />);
    });
    return (

      <div className = "stickyNotes" ref="body">
        { ideas }
      </div>
    );
  }
});

module.exports = Ideas;
