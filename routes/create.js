var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var fs = require('fs');
var path = require('path');

var router = express.Router();
var app = express();

// app.use(cookieParser());

// Creating a new Movie List
router.post('/', function(request, response){
  console.log("In add movie");
  var content = JSON.parse(fs.readFileSync('data/input.json'));

  var obj = {};

  obj.Title       = request.body.Title;
  obj.Year        = request.body.Year;
  obj.Actors      = request.body.Actors;
  obj.Director    = request.body.Director;
  obj.Released    = request.body.Released;
  obj.Plot        = request.body.Plot;
  obj.imdbRating  = request.body.Rating;
  obj.Awards      = request.body.Awards;
  obj.Poster      = "images/" + request.body.imageurl;

  content.push(obj);

  fs.writeFile('data/input.json', JSON.stringify(content), function(err) {
    if(err){
      console.log(err);
    }
  });

  response.redirect('/');
//console.log("Cookies : " + request.cookies);

});

module.exports = router;
