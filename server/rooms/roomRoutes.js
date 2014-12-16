var roomController = require('./roomController.js');

module.exports = function (app) {
  // app === userRouter injected from middlware.js
  app.route('/')
  .post(roomController.newRoom)
  .get(roomController.allRooms);

  app.route('/:room_id')
    .put(roomController.updateRoom)
    .delete(roomController.deleteRoom);
};