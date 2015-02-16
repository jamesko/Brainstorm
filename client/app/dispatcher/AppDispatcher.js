//require app
//require Flux.Dispatcher

var AppDispatcher = _.extend(new Flux.Dispatcher(), {
  handleViewAction: function(action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  }
});

module.exports = AppDispatcher;
