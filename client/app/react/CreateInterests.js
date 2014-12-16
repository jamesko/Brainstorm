app.CreateInterest = React.createClass({displayName: 'CreateInterest',
  render: function(){
    return (
      React.createElement("div", null, 
        React.createElement(app.InterestForm, null)
      )
    );
  }
});
