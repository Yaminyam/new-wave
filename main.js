var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var path = require('path');

app.use(express.static('public'));

var indexRouter = require('./routes/index');

app.use("/", express.static(path.join(__dirname, "public")));

app.use('/',indexRouter);


server.listen(8080, function(){
  console.log('Server 8080!');
});
