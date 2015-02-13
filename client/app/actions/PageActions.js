app.PageActions = {
  navigate: function(body) {
    app.AppDispatcher.handleViewAction({
      actionType: app.PageConstants.NAVIGATE,
      body: body
    });
  },
  getRoomData: function(room_id) {
    app.AppDispatcher.handleViewAction({
      actionType: app.PageConstants.GETROOMDATA,
      room_id: room_id
    });
  },
  getBrainswarmData: function(brainswarm_id) {
    app.AppDispatcher.handleViewAction({
      actionType: app.PageConstants.GETBRAINWARMDATA,
      brainswarm_id: brainswarm_id
    });
  }

};

// getBrainswarmData to direct people to a brainswarm
