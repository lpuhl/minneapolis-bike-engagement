var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/bikeways';

 // routes
router.post('/', function(req, res) {
  var contact = req.body;
  console.log(contact);
  // Store in DB
  // pg.connect(connectionString, function(err, client, done) {
  //   if(err) {
  //     // console.log(err);
  //     res.sendStatus(500);
  //   }
  //   client.query('INSERT INTO contacts (firstname, lastname, street, city, zip, phone, email, list, comment) ' +
  //                'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
  //     [contact.first_name, contact.last_name, contact.address, contact.city, contact.zip, contact.phone, contact.email, contact.list, contact.comment],
  //     function(err, result) {
  //       done();
  //       if(err) {
  //         console.log("query error: ", err);
  //         res.sendStatus(500);
  //       }
  //       // created!
  //       res.sendStatus(201);
  //     });
  // });
});

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

module.exports = router;

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
