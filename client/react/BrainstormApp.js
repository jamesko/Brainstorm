var React = require("react");
var CreateRoom = require("./CreateRoom");
var Rooms = require("./Rooms");
var RoomTitle = require("./RoomTitle");
var CreateIdea = require("./IdeaForm");
var SearchBar = require("./SearchBar");
var Ideas = require("./Ideas");
var Brainswarm = require("./Brainswarm");
var PageNav = require("./PageNav");

var BrainstormApp = React.createClass({
  getInitialState: function() {
    return {
      indexView: true,
      roomView: false,
      currentUser: app.UserStore.get(),
      filterText: '',
      filterNames: ''
    };
  },

  componentDidMount: function () {
    app.UserStore.addChangeListener(function() {
      if(this.isMounted()) {
        this.setState({ currentUser: app.UserStore.get() });
      }
    }.bind(this));

    app.PageStore.addChangeListener(function(){

      //get state from the PageStore.currentRoute
      var state = app.PageStore.currentRoute;

      //if props is undefined set it to empty string
      state.props = state.props || '';
      state.indexView = (state.dest === 'welcome' ? true : false);
      state.roomView = (state.dest === 'rooms' ? true : false);
      if (state.dest === 'rooms'){
        setTimeout(function () {
          app.PageActions.getRoomData(state.props);
        }, 0);
      } else if (state.dest === 'brainswarms') {
        setTimeout(function () {
          app.PageActions.getBrainswarmData(state.props);
        }, 0);
      }
      this.setState(state);

      if(!state.indexView) {
        socket.emit('join', state.props);
      }
    }.bind(this));
  },

  handleUserInput: function(filterText, filterNames) {
      this.setState({
          filterText: filterText,
          filterNames: filterNames
      });
  },

  render: function(){
    var currentView;
    if(this.state.indexView) { //thisIsHomePage
      currentView = (
        <div>
          <CreateRoom />
          <Rooms />
        </div>
      );
    } else if (this.state.roomView) { // must be a room
      currentView = (
        <div>
          <RoomTitle room_id={this.state.props}/>
          <CreateIdea room_id={this.state.props}/>
          <SearchBar
              filterText={this.state.filterText}
              filterNames={this.state.filterNames}
              onUserInput={this.handleUserInput}
          />
          <Ideas room_id={this.state.props}
            filterText={this.state.filterText}
            filterNames={this.state.filterNames}
          />
        </div>
      );
    } else { // brainswarm
     currentView = (
      <div>
        <Brainswarm _id={this.state.props}/>

      </div>
     );
    }

    return (
      <div className={'user-' + !!this.state.currentUser} >
        <PageNav />
        { currentView }
      </div>
    );
  }
});

module.exports = BrainstormApp;
