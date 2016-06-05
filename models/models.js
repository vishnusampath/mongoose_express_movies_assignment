var mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
  Title: String,
  Year: String,
  Released: String,
  Director: String,
  Actors: String,
  Plot: String,
  Awards: String,
  imdbRating: String,
  imdbID: String,
  Poster: String
});

var movieSchema = mongoose.model("moviescollection", movieSchema, "moviescollection");

module.exports.movieSchema = movieSchema;
