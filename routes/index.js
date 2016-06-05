var express = require('express');
var fs = require('fs');
var path = require('path');

var appData = require('../app.js');

var router = express.Router();
var app = express();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Reading the JSON file
router.get('/getJSON', function (req, res) {
  console.log("Inside getJSON");

  var db = appData.db;
  db.on("error", console.error.bind(console, "Connection Error:"));

  db.open('open', function () {
    appData.Movie.find({}, function (err, data) {
      console.log("----------------- In db.open ----------------");
      res.json(data);
    });
  });
  // var content = fs.readFileSync('data/input.json');
  // res.json(content.toString());
});

module.exports = router;
