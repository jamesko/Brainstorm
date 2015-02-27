var React = require("react");
var IdeaForm = require("./IdeaForm");
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var CreateIdea = React.createClass({

  mixins: [PureRenderMixin],
  propTypes:{
    room_id: React.PropTypes.string
  },

  render: function(){
    return (
      <div>
        <IdeaForm room_id={this.props.room_id} />
      </div>
    );
  }
});

module.exports = CreateIdea;
