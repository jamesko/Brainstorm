var AppDispatcher = require("../dispatcher/AppDispatcher");
var CommentConstants = require("../constants/CommentConstants");

var CommentActions = {
  get: function () {
    AppDispatcher.handleViewAction({
      actionType: CommentConstants.COMMENT_GET
    });
  },
  create: function (idea_id, name, ownerName) {
    AppDispatcher.handleViewAction({
      actionType: CommentConstants.COMMENT_CREATE,
      idea_id: idea_id,
      name: name,
      ownerName: ownerName
    });
  },
  edit: function (_id, name, ownerName) {
    AppDispatcher.handleViewAction({
      actionType: CommentConstants.COMMENT_EDIT,
      _id: _id,
      name: name,
      ownerName: ownerName
    });
  },
  delete: function (_id) {
    AppDispatcher.handleViewAction({
      actionType: CommentConstants.COMMENT_DELETE,
      _id: _id
    });
  }
};

module.exports = CommentActions;
