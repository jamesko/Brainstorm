app.BrainswarmStore = _.extend({}, EventEmitter.prototype, {
  _brainswarms: [],

  getAll: function() {
    return this._brainswarms;
  },

  getBrainswarm: function(brainswarmId) {
  // console.log("try to get brainswarm");
   var brainswarms = this._brainswarms;
   for (var i =0; i< brainswarms.length; i++){
      if (brainswarms[i]._id === brainswarmId){
        return brainswarms[i];
      }
   }
  },

  findBrainswarm: function(idea_id) {
    var brainswarms = this._brainswarms;
   // console.log("get here for brainswarms", brainswarms);
    for (var i =0; i< brainswarms.length; i++){
       if (brainswarms[i].idea === idea_id){
      //    console.log("these should be equal", brainswarms[i].idea, idea_id)
         return brainswarms[i];
       }
    }
  },

  create: function(idea_id, name) {
  //  console.log('this is create name', name);
    $.ajax({
      type: 'POST',
      url: '/brainswarms/' + idea_id,
      data: {name: name}
    })
    .done(function(brainswarm) {
      //console.log("made brainswarm",brainswarm)
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

    // $.ajax({
        //   type: 'PUT',
        //   url: '/brainswarms/' + brainswarmId,
        //   data: {map: data},
        //   success: function(data) {
        //     console.log("worked")
        //   }
        // });

  edit: function(brainswarmId, map) {
     // console.log("i shouldnt be in edit")
     $.ajax({
       type: 'PUT',
       url: '/brainswarms/' + brainswarmId,
       data: {map: map}
     })
     .done(function(brainswarmEdit) {
         console.log('this is the edit: ', brainswarmEdit);
      // Why are we storing the data in the client and on the server??

       // look through the brainswarms until finding a match
       // for id and then update the name property
       this._brainswarms.forEach(function(brainswarm) {
        // Are you sure it is brainswarmEdit.id????
        // possibly brainswarmEdit.id
         if(brainswarm._id === brainswarmEdit._id) {
           brainswarm.map = brainswarmEdit.map;
           // broadcast that _brainswarms has changed
           socket.emit('brainswarm-change', this._brainswarms);
           return this.emitChange();
         }
       }.bind(this));
     }.bind(this))
     .fail(function(error) {
       console.error(error);
     });
  },

  visitBrainswarm: function(brainswarmId){
    app.PageActions.navigate({
      dest: 'brainswarms',
      props: brainswarmId
    });
  },


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
        app.BrainswarmStore.edit(action.brainswarmId, action.map);

      break;

    case app.BrainswarmConstants.BRAINSWARM_GET:
      app.BrainswarmStore.getBrainswarm(action.brainswarmId);
     break;

    case app.BrainswarmConstants.BRAINSWARM_VISIT:
      app.BrainswarmStore.visitBrainswarm(action.brainswarmId);
     break;

    default:
      return true;
  }
});

