var AppDispatcher = require("../dispatcher/AppDispatcher");
var IdeaConstants = require("../constants/IdeaConstants");

var IdeaActions = {
  create: function(room_id, name) {
    AppDispatcher.handleViewAction({
      actionType: IdeaConstants.IDEA_CREATE,
      room_id: room_id,
      name: name
    });
  },

  edit: function(idea) {
    AppDispatcher.handleViewAction({
      actionType: IdeaConstants.IDEA_EDIT,
      idea: idea
    });
  },

  delete: function(idea) {
    AppDispatcher.handleViewAction({
      actionType: IdeaConstants.IDEA_DELETE,
      idea: idea
    });
  }
};

module.exports = IdeaActions;
