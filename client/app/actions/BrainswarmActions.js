var AppDispatcher = require("../dispatcher/AppDispatcher");
var BrainswarmConstants = require("../constants/BrainswarmConstants");

var BrainswarmActions = {
  create: function(idea_id, name, cb) {
    AppDispatcher.handleViewAction({
      actionType: BrainswarmConstants.BRAINSWARM_CREATE,
      idea_id: idea_id,
      name: name,
      callback: cb
    });
  },

  edit: function(brainswarmId, map) {
    AppDispatcher.handleViewAction({
      actionType: BrainswarmConstants.BRAINSWARM_EDIT,
      brainswarmId: brainswarmId,
      map: map
    });
  },

  getBrainswarm: function(brainswarmId) {
    AppDispatcher.handleViewAction({
      actionType: BrainswarmConstants.BRAINSWARM_GET,
      brainswarmId: brainswarmId
    })
  },

  visit: function(brainswarmId) {
    AppDispatcher.handleViewAction({
      actionType: BrainswarmConstants.BRAINSWARM_VISIT,
      brainswarmId: brainswarmId
    })
  }
};

module.exports = BrainswarmActions;
