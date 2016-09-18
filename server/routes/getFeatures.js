var express = require('express');
var router = express.Router();
// var pg = require('pg');
// var connectionString = 'postgres://localhost:5432/bikeways';
// var CartoDB = require('cartodb');


// routes
router.get('/', function(req, res) {

});

module.exports = router;

//   router.get('/', function(req, res) {
//   pg.connect(connectionString, function(err, client, done) {
//     if(err) {
//       console.log(err);
//       res.sendStatus(500);
//     }
//
//     client.query("SELECT * FROM pets",
//       function(err, result) {
//         done();
//
//         if(err) {
//           console.log("select error: ", err);
//           res.sendStatus(500);
//         }
//         // console.log('results: ', resultStuff);
//
//         res.send(result.rows);
//     });
//
//   });
// });


//
// router.put('/:id', function(req, res) {
//   var petID = req.params.id;
//
//   pg.connect(connectionString, function(err, client, done) {
//     if(err) {
//       console.log(err);
//       res.sendStatus(500);
//     }
//
//     client.query("UPDATE pets SET completed_date = 'NOW()' WHERE id = $1",
//       [petID],
//       function(err, result) {
//         done();
//
//         if(err) {
//           console.log("update error: ", err);
//           res.sendStatus(500);
//         }
//
//         res.sendStatus(200);
//     });
//   });
// });
//
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
