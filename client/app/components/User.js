var React = require("react");
var UserAuth = require("./UserAuth");

var User = React.createClass({
  render: function(){
    return (<UserAuth />);
  }
});

module.exports = User;
