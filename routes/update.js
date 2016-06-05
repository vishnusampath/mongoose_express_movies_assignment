var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var fs = require('fs');
var path = require('path');

var router = express.Router();
var app = express();

router.post('/', function(request, response) {
  console.log("In Update");

  var content = JSON.parse(fs.readFileSync('data/input.json'));

  for (var i = 0; i < content.length; i++) {

     if(content[i].Title == request.body.Title){
        content[i].Plot         = request.body.updPlot;
        content[i].imdbRating   = request.body.updRating;
        content[i].Awards       = request.body.updAwards;
        content[i].Poster       = "images/" + request.body.imageURL;
        break;
    }
  }
   fs.writeFile('data/input.json', JSON.stringify(content), function(err) {
   if(err){
       console.log(err);
    }
  });

  response.redirect('/');
});

module.exports = router;
