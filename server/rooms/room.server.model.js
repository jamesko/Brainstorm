'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoomSchema = new Schema({
  name: {
    type: String
  },
  owner: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  ownerName: {
    type: String,
  }
});

module.exports = mongoose.model('Room', RoomSchema);