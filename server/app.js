/** ---------- THIRD PARTY MODULES ---------- **/
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

/** ---------- OUR MODULES ---------- **/
var bikemap = require('./routes/maproute');

/** ---------- EXPRESS ROUTES ---------- **/
app.use('/maproute', bikemap);

app.get('/*', function(req, res) {
  var file = req.params[0] || '/views/index.html';
  res.sendFile(path.join(__dirname, './public', file));
});

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/** ---------- START SERVER ---------- **/
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function() {
  console.log('server is running on port ', app.get('port'));
});
