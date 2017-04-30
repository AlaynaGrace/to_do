//requires
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var pg = require('pg');

//uses
app.use(express.static('public'));
app.us(bodyParser.urlencoded({extended: true}));

//spin up server
app.listen(5000, function(){
  console.log('server up on port 5000');
});

//config object for setting up pool
var config = {
  database: 'to-do-list',
  host: 'localhost',
  port: 5432,
  max: 12
};

var pool = new pg.Pool(config);
