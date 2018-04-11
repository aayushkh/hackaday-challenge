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

var apikey = "RzYEaCIPvzmeHX4e";

app.get("/projects", function(req, res) {
	console.log("Request Recieved at Backend");

	url = "http://api.hackaday.io/v1/projects?api_key=" + apikey;

	request.get({
	    url: url,
	    json: true,
	    headers: {'User-Agent': 'request'}
	  }, (err, response, data) => {
	    if (err) {
	    	console.log('Error:', err);
	    } else if (res.statusCode !== 200) {
	    	console.log('Status:', response.statusCode);
	    } else {
	      	res.setHeader('content-type', 'application/json');
			res.json(data);
	    }
	});
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
