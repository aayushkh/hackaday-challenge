var path = require("path");
var express = require("express");
var cors = require("cors");
var request = require("request");

/* Innitializing Expresss, CORS */
var app = express();

app.use(express.static("./public"));
// app.use(cors());

app.use(function(req, res, next) {
	console.log(`${req.method} request for '${req.url}' - `);
	next();
});

/* Server side call made to projects */
app.get("/projects", function(req, res) {

	var apikey = "RzYEaCIPvzmeHX4e";
	var page = req.query.page;
	url = "http://api.hackaday.io/v1/projects?api_key=" + apikey + "&page=" + page;

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
    var server = app.listen(process.env.port || 8081, function () {
    var port = server.address().port;

    console.log('App listening on port %s', port);
    console.log('Press Ctrl+C to quit.');
  });
}

module.exports = app;
