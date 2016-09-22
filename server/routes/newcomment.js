var express = require('express');
var router = express.Router();
// var pg = require('pg');
// var connectionString = 'postgres://localhost:5432/bikeways';
// var http = require('http');
var CartoDB = require('cartodb');

// routes
router.post('/', function(req, res) {
  var record = req.body;
  console.log(record);

  var cartoUser = new CartoDB.SQL({'user':});

  var sql = "SELECT "+ 'insert_crowd_mapping_data' +"(";
  sql += "'" + record.geometry + "'";
  sql += "," + "'" + record.comment + "'";
  sql += "," + "'" + record.firstname + "'";
  sql += "," + "'" + record.lastname + "'";
  sql += "," + "'" + record.street + "'";
  sql += "," + "'" + record.city + "'";
  sql += "," + "'" + record.state + "'";
  sql += "," + "'" + record.zip + "'";
  sql += "," + "'" + record.phone + "'";
  sql += "," + "'" + record.email + "'";
  sql += "," + "'" + record.list + "');";
  console.log(sql);
  cartoUser.execute(sql).done(function(data) {
    console.log(data);
  }).error(function (err) {
      console.log(err);
  });
  console.log("got here");

});

module.exports = router;
