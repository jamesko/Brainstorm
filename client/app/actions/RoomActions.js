var AppDispatcher = require("../dispatcher/AppDispatcher");
var RoomConstants = require("../constants/RoomConstants");

var RoomActions = {
  create: function(name) {
    AppDispatcher.handleViewAction({
      actionType: RoomConstants.ROOM_CREATE,
      name: name
    });
  },

  edit: function(room) {
    AppDispatcher.handleViewAction({
      actionType: RoomConstants.ROOM_EDIT,
      room: room
    });
  },

  delete: function(room) {
    AppDispatcher.handleViewAction({
      actionType: RoomConstants.ROOM_DELETE,
      room: room
    });
  }
};

module.exports = RoomActions;
