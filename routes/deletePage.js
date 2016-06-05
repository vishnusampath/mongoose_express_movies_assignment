var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var fs = require('fs');
var path = require('path');

var router = express.Router();
var app = express();

router.post('/', function(request, response) {
  console.log("Inside delete");
  // var reqData = "";
  // reqData = request.params.x;

//  console.log(reqData);
  var content = JSON.parse(fs.readFileSync('data/input.json'));

  for (var i = 0; i < content.length; i++) {
    if(content[i].Title == request.body.Title){

      content[i] = content[content.length - 1];
      content.length = content.length - 1;
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
