var app = require('./server/server.js');

var port = process.env.port || 8000;
app.listen(port, function() {
  console.log('Server is listening on ' + port);
});