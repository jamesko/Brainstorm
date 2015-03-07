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
  it('can connect to a room', function(done){

    var client1 = io.connect(url(''), options);
    var client2 = io.connect(url(''), options);
    var room = "test room";
    var comment = "this is a test";

    client1.on('comment-change', function(data){
      expect(data).to.equal(comment);
      client1.disconnect();
      client2.disconnect();
      done();
    });

    // client1.on('connect', function(){
    //   client1.emit('join', 'mockRoom');
    //   var client2 = io.connect(url(''), options);
    //   client2.on('connect', function(){
    //     client2.emit('join', 'mockRoom');
    //     client2.emit('comment-change', 'some....comments', 'mockRoom');     
    //   })
    // })

    client1.emit('join', room);
    client2.emit('join', room);
    client2.emit('comment-change', comment, room);

  });

});