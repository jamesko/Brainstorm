app.BrainswarmStore = _.extend({}, EventEmitter.prototype, {
  _brainswarms: [],

  getAll: function() {
    return this._brainswarms;
  },

  create: function(idea_id, name) {
    console.log('this is create name', name);
    $.ajax({
      type: 'POST',
      url: '/brainswarms/' + idea_id,
      data: {name: name}
    })
    .done(function(brainswarm) {
      console.log("made brainswarm",brainswarm)
       this._brainswarms.push(brainswarm);

      // broadcast that _rooms has changed
      socket.emit('room-change', this._brainswarms);
      this.emitChange();

      app.PageActions.navigate({
        dest: 'brainswarms',
        props: brainswarm._id
      });
    }.bind(this))
    .fail(function(error) {
      console.log(error);
    });
  },

  // edit: function(room) {
  //   // console.log("i shouldnt be in edit")
  //   $.ajax({
  //     type: 'PUT',
  //     url: '/rooms/' + room.id,
  //     data: room
  //   })
  //   .done(function(roomEdit) {
  //     // look through the rooms until finding a match
  //     // for id and then update the name property
  //     this._rooms.forEach(function(room) {
  //       if(room._id === roomEdit._id) {
  //         room.name = roomEdit.name;
  //         // broadcast that _rooms has changed
  //         socket.emit('room-change', this._rooms);
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
    case app.BrainswarmConstants.BRAINSWARM_CREATE:
      name = action.name.trim();

      if (name !== '') {
        app.BrainswarmStore.create(action.idea_id, name);
      }
      break;

    case app.BrainswarmConstants.BRAINSWARM_EDIT:
      if(action.brainswarm.name !== '') {
        app.BrainswarmStore.edit(action.brainswarm);
      }
      break;

    default:
      return true;
  }
});
