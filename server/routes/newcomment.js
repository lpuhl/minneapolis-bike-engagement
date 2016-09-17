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

  var cartoUser = new CartoDB.SQL({'user':'lizzz', 'api_key':'f4a44b60db13393514e7e8ff3ceb79245b852f51'});

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

// router.delete('/:id', function(req, res) {
//   var petID = req.params.id;
//
//   pg.connect(connectionString, function(err, client, done) {
//     if(err) {
//       console.log(err);
//       res.sendStatus(500);
//     }
//
//   client.query("DELETE FROM pets WHERE id = $1",
//       [petID],
//       function(err, result) {
//         done();
//
//         if(err) {
//           console.log("delete error: ", err);
//           res.sendStatus(500);
//         }
//
//         res.sendStatus(202);
//     });
//   });
//
// });
