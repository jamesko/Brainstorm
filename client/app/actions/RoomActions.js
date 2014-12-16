app.RoomActions = {
  create: function(name) {
    app.AppDispatcher.handleViewAction({
      actionType: app.RoomConstants.ROOM_CREATE,
      name: name
    });
  },

  edit: function(room) {
    app.AppDispatcher.handleViewAction({
      actionType: app.RoomConstants.ROOM_EDIT,
      room: room
    });
  },

  delete: function(room) {
    app.AppDispatcher.handleViewAction({
      actionType: app.RoomConstants.ROOM_DELETE,
      room: room
    });
  }
};
