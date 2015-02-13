app.BrainswarmActions = {
  create: function(idea_id, name) {
    app.AppDispatcher.handleViewAction({
      actionType: app.BrainswarmConstants.BRAINSWARM_CREATE,
      idea_id: idea_id,
      name: name
    });
  },

  edit: function(brainswarm) {
    app.AppDispatcher.handleViewAction({
      actionType: app.BrainswarmConstants.BRAINSWARM_EDIT,
      brainswarm: brainswarm
    });
  }
};
