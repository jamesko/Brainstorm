var React = require("react");
var User = require("./User");
var PageActions = require("../actions/PageActions");

var PageNav = React.createClass({

  handleWelcome:function(){
    //dispatch a navigate to welcome on click
    PageActions.navigate({
      dest: 'welcome'
    });
  },

  render:function(){
    return (
      <header ref="body">
        <nav>
          <div className="nav-wrapper  blue darken-3">
            <ul className="login right">
              <li>
                <User />
              </li>
            </ul>
            <ul id="nav-mobile" className="left hide-on-med-and-down">
              <li ref="welcome">
                <div style={{paddingLeft:"10px", paddingRight:"10px"}} onClick={this.handleWelcome}>Home</div>
              </li>
              <li>
                <div style={{paddingLeft:"10px", paddingRight:"10px"}}>About</div>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }

});

module.exports = PageNav;
