var React = require("react");
var Idea = require("./Idea");
var IdeaStore = require("../stores/IdeaStore");
var Draggable = require('react-draggable');
var UserStore = require("../stores/UserStore");
var socket = io();

React.initializeTouchEvents(true);
var Ideas = React.createClass({
  getInitialState: function () {
    return {
      ideas: IdeaStore.getAll(),
      currentUser: UserStore.get()
    };
  },

  pauseUpdates: false,

  componentDidMount: function () {
    IdeaStore.get(this.props.room_id);
    IdeaStore.addChangeListener(this.onStoreChange);
  },

  onStoreChange: function(){

    var that = this;
    if(this.isMounted()) {
      if(!that.pauseUpdates){
        this.setState({ ideas: IdeaStore.getAll() });
      }
    }
    // get all ideas from db
  },

  deleteIdea: function(event){
    event.preventDefault();
    console.log("delete me");
    console.log("delete event", event);
    // socket.on("idea-move", function(ideaId, ideaOwner, ideaPosition){
    //   if (currentUser._id === ideaOwner){
    //     IdeaActions.delete({ id: ideaId, owner: ideaOwner});
    //   } else {
    //     alert("Not your idea!");
    //   }
    // });
  },

  // componentWillUnmount: function(){
  //   IdeaStore.removeChangeListener(this.onStoreChange);
  // },

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

    <div className="container">
      <div className="stickyNotes">
        { ideas }
      </div>
      <br/>
      <br/>
      <div style={{marginBottom: "50px"}} className="fa fa-trash-o fa-5x trashcan" onMouseEnter={this.deleteIdea}> </div>
      <img className="expo-marker" src="styles/assets/expo-marker.jpg" />
    </div>
    );
  }
});

module.exports = Ideas;
