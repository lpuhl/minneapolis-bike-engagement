var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/bikeways';

router.get('/', function(req, res) {
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT * FROM bikemap",
      function(err, result) {
        done();
        if(err) {
          console.log("select error: ", err);
          res.sendStatus(500);
        }
        // console.log('results: ', resultStuff);
        res.send(result.rows);
      });
  });
});

module.exports = router;


// routes
// router.post('/', function(req, res) {
//   console.log(req.body);
//   var record = req.body;
//   console.log(record);
//   // Store in DB
//   pg.connect(connectionString, function(err, client, done) {
//     if(err) {
//       console.log('connection error :', err);
//       res.sendStatus(500);
//     }
//     console.log('connect record: ', record);
//     client.query('INSERT INTO bikemap (firstname, lastname, street, city, state, zip, phone, email, list, comment, geometry) ' +
//                  'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
//       [record.first_name, record.last_name, record.street, record.city, record.state, record.zip, record.phone, record.email, record.list, record.comment, record.geometry],
//       function(err, result) {
//         done();
//         if(err) {
//           console.log("query error: ", err);
//           res.sendStatus(500);
//         }
//         // created!
//         res.sendStatus(201);
//       });
//   });
// });
//



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
