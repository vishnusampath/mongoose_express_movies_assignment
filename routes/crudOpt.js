var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var fs = require('fs');
var path = require('path');

var router = express.Router();
var app = express();

var appData  = require('../app.js');

app.use(cookieParser());

// Create a new movie

router.post('/add', function (request, response) {
  console.log('In add');
  var obj = {};
  obj.Title      = request.body.Title;
  obj.Year       = request.body.Year;
  obj.Actors     = request.body.Actors;
  obj.Director   = request.body.Director;
  obj.Released   = request.body.Released;
  obj.Plot       = request.body.Plot;
  obj.imdbRating = request.body.Rating;
  obj.Awards     = request.body.Awards;
  obj.Poster     = 'images/' + request.body.imageurl;

  appData.db.open('open', function () {

    var post = new appData.Movie({Title: obj.Title,Year:obj.Year,Actors:obj.Actors,Director:obj.Director,Released:obj.Released,Plot:obj.Plot,imdbRating:obj.imdbRating,Awards:obj.Awards,Poster: obj.Poster});

    post.save(function (err) {
      if (err) {
        return err;
      }
      else {
        console.log("Saved");
      }
    });
  });

  response.redirect('/');
});

// Update a movie
router.post('/update', function (request, response) {
  console.log('In update');

  var Title, updRating, updAwards, updPoster;

  Title     = request.body.Title;
  updRating = request.body.updRating;
  updAwards = request.body.updAwards;
  updPoster = "images/" + request.body.imageURL;

  appData.db.open('open', function (){
    console.log('Inside update db.open');
    appData.Movie.where({Title:Title}).update({$set : {imdbRating:updRating, Awards:updAwards, Poster:updPoster}}, function (err) {
      if(err) throw err;
    });
  });

  response.redirect('/');
});

// Delete a movie from the list
router.post('/deletePage', function (request, response) {
  console.log('Inside delete');
  var deleteTitle  = request.body.Title;

  appData.db.open('open', function (){
    appData.Movie.remove({'Title':deleteTitle}, function (err) {
      if (err) throw err;
    });
  });

  response.redirect('/');
});

module.exports = router;
