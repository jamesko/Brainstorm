var AppDispatcher = require("../dispatcher/AppDispatcher");
var InterestConstants = require("../constants/InterestConstants");

var InterestActions = {
  get: function () {
    AppDispatcher.handleViewAction({
      actionType: InterestConstants.INTEREST_GET
    });
  },
  create: function (idea_id) {
    AppDispatcher.handleViewAction({
      actionType: InterestConstants.INTEREST_CREATE,
      idea_id: idea_id
    });
  },
  delete: function (_id) {
    AppDispatcher.handleViewAction({
      actionType: InterestConstants.INTEREST_DELETE,
      _id: _id
    });
  }
};

module.exports = InterestActions;
