app.RoomStore = _.extend({}, EventEmitter.prototype, {
  _rooms: [],

  getAll: function() {
    return this._rooms;
  },

  all: function() {
    $.ajax({
      type: 'GET',
      url: '/rooms'
    })
    .done(function(rooms) {
      this._rooms = rooms;
      this.emitChange();
    }.bind(this))
    .fail(function(error) {
      console.log(error);
    });

    socket.on('room-change', function(currentRooms) {
      this._rooms = currentRooms;
      this.emitChange();
    }.bind(this));
  },

  create: function(name) {
    $.ajax({
      type: 'POST',
      url: '/rooms',
      data: {name: name}
    })
    .done(function(room) {
      console.log(room)
      this._rooms.push(room);

      // broadcast that _rooms has changed
      socket.emit('room-change', this._rooms);
      this.emitChange();

      app.PageActions.navigate({
        dest: 'rooms',
        props: room._id
      });
    }.bind(this))
    .fail(function(error) {
      console.log(error);
    });
  },

  // edit: function(idea) {
  //   $.ajax({
  //     type: 'PUT',
  //     url: '/ideas/' + idea.id,
  //     data: idea
  //   })
  //   .done(function(ideaEdit) {
  //     // look through the ideas until finding a match
  //     // for id and then update the name property
  //     this._ideas.forEach(function(idea) {
  //       if(idea._id === ideaEdit._id) {
  //         idea.name = ideaEdit.name;

  //         // broadcast that _ideas has changed
  //         socket.emit('idea-change', this._ideas, this._room());
  //         return this.emitChange();
  //       }
  //     }.bind(this));
  //   }.bind(this))
  //   .fail(function(error) {
  //     console.error(error);
  //   });
  // },

  // delete: function(idea) {
  //   $.ajax({
  //     type: 'DELETE',
  //     url: '/rooms/' + idea.id,
  //     data: idea
  //   })
  //   .done(function(oldId) {
  //     // find deleted idea by oldId in _ideas and remove
  //     this._ideas.forEach(function(idea, index) {
  //       if(idea._id === oldId._id) {
  //         this._ideas.splice(index, 1);

  //         // broadcast that _ideas has changed
  //         socket.emit('idea-change', this._ideas, this._room());
  //         return this.emitChange();
  //       }
  //     }.bind(this));
  //   }.bind(this))
  //   .fail(function(error) {
  //     console.error(error);
  //   });
  // },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

app.AppDispatcher.register(function(payload) {
  var action = payload.action;
  var name;

  switch(action.actionType) {
    case app.RoomConstants.ROOM_CREATE:
      name = action.name.trim();

      if (name !== '') {
        app.RoomStore.create(name);
      }
      break;

    default:
      return true;
  }
});
