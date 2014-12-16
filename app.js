var app = require('./server/productionServer.js');

app.set('port', process.env.PORT || 8000);
app.listen(port, function() {
  console.log('Server is listening on ' + port);
});
