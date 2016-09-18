/** ---------- THIRD PARTY MODULES ---------- **/
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

/** ---------- OUR MODULES ---------- **/
var newComment = require('./routes/newcomment');
// var getContacts= require('./routes/contacts');
var getFeatures= require('./routes/getFeatures');

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/** ---------- EXPRESS ROUTES ---------- **/
app.use('/newcomment', newComment);
// app.use('/contacts', getContacts);
app.use('/getFeatures', getFeatures);


app.get('/*', function(req, res) {
  var file = req.params[0] || '/views/index.html';
  res.sendFile(path.join(__dirname, './public', file));
});

/** ---------- START SERVER ---------- **/
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function() {
  console.log('server is running on port ', app.get('port'));
});
