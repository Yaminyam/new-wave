var express = require('express');
var http = require('http');
var app = express();

app.set('routes', 'ejs');

app.get('/', function (req, res) {
  res.render('index');
});

app.listen(8080, function(){
  console.log('Main Page 8080!');
});