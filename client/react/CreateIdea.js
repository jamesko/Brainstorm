var React = require("react");
var IdeaForm = require("./IdeaForm");

var CreateIdea = React.createClass({
  render: function(){
    return (
      <div>
        <IdeaForm room_id={this.props.room_id} />
      </div>
    );
  }
});

module.exports = CreateIdea;
