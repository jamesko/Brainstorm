app.FilterActions = {
  filterName: function(name) {
    app.AppDispatcher.handleViewAction({
      actionType: app.FilterConstants.FILTER_NAME,
      name: name
      id: id
    });
  },

  unfilterName: function(name) {
    app.AppDispatcher.handleViewAction({
      actionType: app.FilterConstants.UNFILTER_NAME,
      name: name
      id: id
    });
  }

};
