//requires
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var pg = require('pg');

//uses
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

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

app.get('/tasks',function(req,res){
  var allTasks = [];
  pool.connect(function(err, connection, done){
    if(err){
      console.log(err);
      res.send(400);
    }
    else{
      console.log('connected to db');
      var resultSet = connection.query('SELECT * FROM tasks');
      //convert each row into an object in the allTasks array
      //on each row, push the row into allTasks
      resultSet.on('row',function(row){
        allTasks.push(row); //converts to an obj and pushes into arr
      });
      //on end of rows, send array as response
      resultSet.on('end', function(){
        //always want to run done before res.send ing anything
        done();
        res.send(allTasks);
      });
    }
  });
});

app.post('/newTask',function(req,res){
  var data = req.body;
  var qryStr = 'INSERT INTO tasks(task,completed) VALUES($1,$2)';

  pool.connect(function(err,connection,done){
    if(err){
      console.log(err);
      res.send(400);
    }
    else{
      connection.query(qryStr, [data.task,data.completed]);
      done();
      res.send(200);
    }
  });
});

app.delete('/deleteTask',function(req,res){
  pool.connect(function(err,connection,done){
    if(err){
      console.log(err);
      res.send(400);
    }
    else{
      connection.query('DELETE from tasks where id=' + req.body.id );
      done();
      res.send(200);
    }
  });
});

app.post('/completed', function(req,res){
  pool.connect(function(err,connection,done){
    if(err){
      console.log(err);
      res.send(400);
    }
    else{
      console.log(req.body);
      connection.query('UPDATE tasks SET completed = $1 WHERE id = $2',[req.body.completed, req.body.id]);
      done();
      res.send(200);
    }

  });
});
