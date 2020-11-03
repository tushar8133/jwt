var jwt = require("jsonwebtoken");
var path = require("path");
var express = require("express");
var app = express();

var ACCESS_TOKEN_SECRET = "hastalavista"; // require("crypto").randomBytes(16).toString("hex");

app.use(express.static(path.join(__dirname, "/")));
app.use(express.json());



app.get("/", function(req, res) {
	res.sendFile("index.html");
});

app.post("/authenticate", function(req, res) {
	
	if(req.body.username.length <= 4) {
		res.json({error: "USER NOT FOUND"});
	} else {
		var accessToken = jwt.sign( {username: req.body.username} , ACCESS_TOKEN_SECRET);
		// res.set({
		//   'Content-Type': 'text/html',
		//   'Content-Length': '123'
		// })
		// res.setHeader('Content-Type', 'text/plain')
		// res.setHeader('Authorization', sign)
		res.json({accessToken: accessToken});
	}
});

app.post("/checkbankbalance", function(req, res) {

	var accessToken = req.headers["authorization"];

	if(!accessToken) {
		// res.sendStatus(401);
		res.json({error: "ACCESS TOKEN NOT FOUND"})
	} else {
		jwt.verify(accessToken, ACCESS_TOKEN_SECRET, function(err, result) {
			console.log(result);
			if(err) {
				// res.sendStatus(403);
				res.json({error: "AUTHENTICATION UNSUCCESFUL"})
			} else {
				res.json({
					error: null,
					username: result.username,
					amount: 99999
				});
			}
		})
	}
	
});

app.listen(4211, function() {
	console.log("**** http://localhost:4211 ****");
})

