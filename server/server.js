'use strict';

var express = require('express');
var mongoose = require('./db.js');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);



io.on('connection', function(client) {

  client.on('join', function(room) {
    if (client.brainswarm){
      client.leave(client.brainswarm);
    }
    client.room = room;
    client.join(room);
  });

  client.on('join-brainswarm', function(brainswarm) {
    client.join(brainswarm);
  });

  // client.on('add-room', function(room){
  //   console.log("added this room", room);
  //   client.join(room);
  //   roomController.newRoom(room)
  // })

  client.on('comment-change', function(currentComments, room) {
    client.broadcast.in(room).emit('comment-change', currentComments);
  });

  client.on('idea-change', function(currentIdeas, room) {
    client.broadcast.in(room).emit('idea-change', currentIdeas);
  });

  client.on('interest-change', function(currentInterests, room) {
    client.broadcast.in(room).emit('interest-change', currentInterests);
  });

  client.on('room-change', function(currentRooms) {
    client.broadcast.emit('room-change', currentRooms);
  });

  client.on('brainswarm-change', function(currentBrainswarms){
    client.broadcast.emit('brainswarm-change', currentBrainswarms);
  })
  // Not sure if we should broadcast this in a room
  client.on('join-brainswarm', function(brainswarm) {
    client.leave(client.room);
    client.brainswarm = brainswarm;
    client.join(brainswarm);
  });
  // client.on('brainswarm-change', function(currentBrainswarms) {
  //   client.broadcast.emit('brainswarm-change', currentBrainswarms);
  // });

  client.on('map change', function(editMap){
    console.log(editMap);
     client.broadcast.emit('edit map', editMap);
  })

});

require('./config/middleware')(app, express);

module.exports = server;
