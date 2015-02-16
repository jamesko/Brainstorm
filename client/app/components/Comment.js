var React = require("react");
var CommentForm = require("./CommentForm");
var UserStore = require("../stores/UserStore");
var CommentActions = require("../actions/CommentActions");

var Comment = React.createClass({
  getInitialState: function() {
    // set initial editing state to false
    return {
      editing: false,
      currentUser: UserStore.get()
    };
  },

  componentWillReceiveProps: function() {
    // remove the editing parameter when the view updates
    this.setState({editing: false});
  },

  render: function() {
    var editForm;
    // if editing render edit form otherwise render "Edit Idea" button
    if (this.state.editing) {
      editForm = <CommentForm editing={this.state.editing} name={this.props.name} key={this.props._id} _id={this.props._id} />
    }

    return (
      <div>
        <h5 ref="body">{this.props.ownerName}: {this.props.name}</h5>
        <form className="pure-form formEditComment" >
          {editForm}
          <button className="pure-button" onClick={this.edit}>{ this.state.editing ? 'Cancel' : 'Edit Comment'}</button>
          <button className="pure-button" onClick={this.delete}>Delete Comment</button>
        </form>
      </div>
    );
  },

  edit: function(e) {
    e.preventDefault();
    if (this.isMounted()) {
      this.setState({editing: !this.state.editing});
    }
  },

  delete: function(e) {
    e.preventDefault();
    if(this.isMounted()) {
      CommentActions.delete(this.props._id);
    }
  }
});

module.exports = Comment;
