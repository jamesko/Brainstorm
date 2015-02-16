var React = require("react");
var UserStore = require("../stores/UserStore");

var UserAuth = React.createClass({
  getInitialState: function() {
    return { currentUser: UserStore.get() };
  },

  handleClick: function(e) {
    if(this.state.currentUser) {
      e.preventDefault();
      UserStore.logout();
    }
  },

  render: function(){
    var text = this.state.currentUser ? 'Logout' : 'Login';
    return (
      <div>
        <a className='pure-button pure-button-primary' onClick={this.handleClick} href='/auth'>{text}</a>
      </div>
    );
  },

  componentDidMount: function() {
    UserStore.addChangeListener(function() {
      if(this.isMounted()) {
        this.setState({ currentUser: UserStore.get() });
      }
    }.bind(this));
    UserStore.getCurrentUser();
  }

});

module.exports = UserAuth;
