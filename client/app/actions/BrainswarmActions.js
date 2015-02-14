app.BrainswarmActions = {
  create: function(idea_id, name) {
    app.AppDispatcher.handleViewAction({
      actionType: app.BrainswarmConstants.BRAINSWARM_CREATE,
      idea_id: idea_id,
      name: name
    });
  },

  edit: function(brainswarmId, map) {
    app.AppDispatcher.handleViewAction({
      actionType: app.BrainswarmConstants.BRAINSWARM_EDIT,
      brainswarmId: brainswarmId,
      map: map
    });
  },

  getBrainswarm: function(brainswarmId) {
    app.AppDispatcher.handleViewAction({
      actionType: app.BrainswarmConstants.BRAINSWARM_GET,
      brainswarmId: brainswarmId
    })
  },

  visit: function(brainswarmId) {
    app.AppDispatcher.handleViewAction({
      actionType: app.BrainswarmConstants.BRAINSWARM_VISIT,
      brainswarmId: brainswarmId
    })
  }
};
