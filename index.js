var path = require("path");
var express = require("express");
var cors = require("cors");
var request = require("request");

var app = express();

app.use(express.static("./public"));
app.use(cors());

app.use(function(req, res, next) {
	console.log(`${req.method} request for '${req.url}' - `);
	next();
});



if (module === require.main) {
  // Start the server
    var server = app.listen(process.env.port || 8000, function () {
    var port = server.address().port;

    console.log('App listening on port %s', port);
    console.log('Press Ctrl+C to quit.');
  });
}

module.exports = app;