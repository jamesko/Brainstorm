'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BrainswarmSchema = new Schema({
  name: {
    type: String
  },
  idea: {
    type: Schema.ObjectId,
    ref: 'Idea'
  },
  map: {

  },
  owner: {
   type: Schema.ObjectId,
   ref: 'User'
  },
  ownerName: {
   type: String
  }
});

module.exports = mongoose.model('Brainswarm', BrainswarmSchema);
