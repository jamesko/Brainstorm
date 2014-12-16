app.CommentActions = {
  get: function () {
    app.AppDispatcher.handleViewAction({
      actionType: app.CommentConstants.COMMENT_GET
    });
  },
  create: function (idea_id, name, ownerName) {
    app.AppDispatcher.handleViewAction({
      actionType: app.CommentConstants.COMMENT_CREATE,
      idea_id: idea_id,
      name: name,
      ownerName: ownerName
    });
  },
  edit: function (_id, name, ownerName) {
    app.AppDispatcher.handleViewAction({
      actionType: app.CommentConstants.COMMENT_EDIT,
      _id: _id,
      name: name,
      ownerName: ownerName
    });
  },
  delete: function (_id) {
    app.AppDispatcher.handleViewAction({
      actionType: app.CommentConstants.COMMENT_DELETE,
      _id: _id
    });
  }
};
