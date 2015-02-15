
window.addEventListener ('popstate' , function (event) {
  console.log ('HISTORY' , window.history)
  var path = event.state.path.slice (1);
  var pathParts = path.split ('/');

  if (pathParts[0] === 'brainswarms') {

    app.BrainswarmStore.visitBrainswarm (pathParts[1]);
  }
  app.PageActions.navigate ({
    dest : pathParts[0] ,
    data : pathParts[1]
  });

});