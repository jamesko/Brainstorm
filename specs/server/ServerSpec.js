/* global require, describe, it */
'use strict';

var expect = require('chai').expect;
var request = require('request');
var io = require('socket.io-client');

var url = function(path) {
  return 'http://localhost:8000' + path;
};

var options ={
  transports: ['websocket'],
  'force new connection': true
};

describe("MongoDB", function() {
  it("is there a server running", function(next) {
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect('mongodb://127.0.0.1:27017/brainstormer', function(err, db) {
      expect(err).to.equal(null);
      next();
    });
  });
});

describe('GET /', function() {
  it('responds', function(done){
    request(url('/'), function(error, res) {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});

describe('GET /index.html', function() {
  it('responds', function(done){
    request(url('/index.html'), function(error, res) {
      expect(res.headers['content-type'].indexOf('html')).to.not.equal(-1);
      done();
    });
  });
});

describe('GET /no-such-file.html', function() {
  it('responds', function(done){
    request(url('/no-such-file.html'), function(error, res) {
      expect(res.statusCode).to.equal(404);
      done();
    });
  });
});

describe('Socket connection', function() {
  var client1, client2, room, otherRoom, text, otherText;

  beforeEach(function(){
    client1 = io.connect(url(''), options);
    client2 = io.connect(url(''), options);
    room = "test room";
    otherRoom = "other room"
    text = "this is a test";
  });

  afterEach(function(){
      client1.disconnect();
      client2.disconnect();
  });

  it('can join a room', function(done){
    client1.on('comment-change', function(data){
      expect(data).to.equal(text);
      done();
    });
    client1.emit('join', room);
    client2.emit('join', room);
    client2.emit('comment-change', text, room);
  });

  it('broadcasts comment changes to room', function(done){
    client1.on('comment-change', function(data){
      expect(data).to.equal(text);
      done();
    });
    client1.emit('join', room);
    client2.emit('join', room);
    client2.emit('comment-change', text, room);
  });

  it('broadcasts idea changes to room', function(done){
    client1.on('idea-change', function(data){
      expect(data).to.equal(text);
      done();
    });
    client1.emit('join', room);
    client2.emit('join', room);
    client2.emit('idea-change', text, room);
  });

  it('broadcasts interest changes to room', function(done){
    client1.on('interest-change', function(data){
      expect(data).to.equal(text);
      done();
    });
    client1.emit('join', room);
    client2.emit('join', room);
    client2.emit('interest-change', text, room);
  });

  it('broadcasts rooms changes to all', function(done){
    client1.on('room-change', function(data){
      expect(data).to.equal(otherRoom);
      done();
    });
    client1.emit('join', room);
    client2.emit('join', otherRoom);
    client2.emit('room-change', otherRoom);
  });

});