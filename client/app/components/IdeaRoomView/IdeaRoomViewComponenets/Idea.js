var React = require("react");
var IdeaForm = require("./IdeaForm");
var Ideas = require("./Ideas");
var Interest = require("./Interest");
var Comments = require("./Comments");
var ConfirmationBox = require("./ConfirmationBox");
var UserStore = require("../../../stores/UserStore");
var IdeaStore = require("../../../stores/IdeaStore");
var IdeaActions = require("../../../actions/IdeaActions");
var BrainswarmStore = require("../../../stores/BrainswarmStore");
var BrainswarmActions = require("../../../actions/BrainswarmActions");
var Draggable = require('react-draggable');
var socket = io();
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var Router = require("react-router");
var Navigation = Router.Navigation;


var Idea = React.createClass({

  mixins : [PureRenderMixin, Navigation],

  propTypes: {
    _id: React.PropTypes.string,
    room: React.PropTypes.string,
    name: React.PropTypes.string,
    owner: React.PropTypes.string,
    ownerName: React.PropTypes.string,
    position: React.PropTypes.object
  },

  getInitialState : function () {
    // set initial editing state to false
    return {
      displaying: true,
      editing: false,
      filtered: false,
      currentUser: UserStore.get(),
      deleteIdea: false
    };
  } ,

  componentDidUpdate: function() {
    if (this.state.deleteIdea) {
      //activate materialize modal
       $('#modal1').openModal();
    }
  },

  componentDidMount: function() {

    var self = this;
    var ideaId = self.props._id;
    var selectz = '#' + ideaId;

    var node = $(selectz);
    //this is syncing the movement on idea drag
    socket.on('edit location', function(data) {
      var ideaId = self.props._id;

      if (data.id === ideaId) {
        node.css ({"-webkit-transform" : "translate(" + data.ui.left + "px," + data.ui.top + "px)"});
      }
    });


  },
  componentWillUnmount: function() {
    //saving coordinates when leaving room
    this.props.position = this.state.position;
    var idea = this.props;
    idea.id = this.props._id;
    IdeaStore.edit (idea)
  },

  show: function() {
    if (this.isMounted ()) {
      this.setState ({displaying : !this.state.displaying});
    }
  },

  handleStart: function(event , ui) {
    //used for dragStart
  },

  handleDrag: function(event , ui) {
    //prep and send  location data while dragging
    var obj = {};
    obj.ui = ui.position;
    obj.id = this.props._id;

    socket.emit ('idea change' , obj);
  },

  handleStop: function(event , ui) {
    this.setState ({position : {top : event.clientY , left : event.clientX}});
  },

  render: function() {
    var ideaContent;
    var editForm;
    var currentUser = this.state.currentUser;
    var ideaOwner = this.props.owner;
    var cssSelector = this.props._id;
    var confirmBox;

    // if editing render edit form otherwise render "Edit Idea" button
    if (this.state.editing) {

      Ideas.pauseUpdates = true;

      editForm = <IdeaForm editing="true" owner={this.props.owner} name={this.props.name} key={this.props._id} _id={this.props._id} />

    }

    //if displaying form
    if (this.state.displaying && currentUser) {
      Ideas.pauseUpdates = false;
      // if there is a current user and their id is the same as the ideaOwner id, allow them to edit their own idea
      // othersise if they arent a current user of were'nt the originator of an idea, dont let them edit/delete it. just like or comment it
      var editableOption = (<span></span>);
      if (currentUser._id === ideaOwner) {
        editableOption = (
          <div className="auth-check" style={{display : "inline"}}>
            <button className="fa fa-trash-o" style={{paddingRight : "2rem", paddingLeft: ".5rem"}}  onClick={this.delete}></button>
            <button className="fa fa-pencil-square-o" style={{paddingRight : "2rem", paddingLeft: ".5rem"}} onClick={this.edit}> { this.state.editing ? 'Cancel' : ''} </button>
          </div>
        )
      }
      if (this.state.deleteIdea) {
        confirmBox = <ConfirmationBox name={this.props.name} id={this.props._id} owner={this.props.owner}/>
      }

      ideaContent = (

        <div className="idea" id ={cssSelector}>
          <div>
          {confirmBox}
          </div>
          <Draggable onStart={this.handleStart} onDrag={this.handleDrag} onStop={this.handleStop}>
            <div className="anchor">

              <form>
                <div>
                   <div className="ideaDescription" style={{fontSize:"1.75rem"}} ref="body">{this.props.name}</div>
                </div>

                <div className="ideaFooter">
                  <span>{this.props.ownerName}</span>

                  <div className="auth-check watch" style={{display : "inline"}}>
                    <Interest idea_id={this.props._id} />
                  </div>

                  <button className="brainswarm-btn no-margin btn waves-effect waves-light" style={{display:"inline", backgroundColor: "rgba(198, 227, 250, 0.4)", color: "black", marginTop: "1rem", padding: "0px 1rem", marginLeft: ".2rem"}} onClick={this.brainswarm}>Brainswarm</button>
                  <div>
                {editForm}
                {editableOption}
                    <div className="auth-check comments" style={{display : "inline"}}>
                      <Comments idea_id={this.props._id} />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </Draggable>
        </div>
      )
    }

    return (ideaContent);
  },

  edit: function(e) {
    e.preventDefault ();
    if (this.isMounted ()) {
      this.setState ({editing : !this.state.editing});
    }
  },

  delete: function(e) {
    e.preventDefault ();
    if (this.isMounted ()) {
      this.setState ({deleteIdea : !this.state.deleteIdea});
    }
  },

  brainswarm: function(e) {
    e.preventDefault ();

    var name = this.props.name;
    var brainswarmName = name + "_brainswarm";

    var self = this;

    //make ajax request to get most recent graph --> having DB maintain state of room vs syncing multiple client state
    BrainswarmActions.getBrainswarm(self.props._id, function (brainswarmData) {
      if (brainswarmData) {
        self.transitionTo("/brainswarms/" + brainswarmData._id)
      } else {
        BrainswarmActions.create(self.props._id, brainswarmName, function (brainswarmId) {
          self.transitionTo("/brainswarms/" + brainswarmId)
        });
      }
    });


  }
});

module.exports = Idea;


