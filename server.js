// SERVER NODE.JS

// require express framework and additional modules
var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	_ = require("underscore");

// tell app to use bodyParser middleware
app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

var postArray = [
{id: 1, image: "http://images.akamai.steamusercontent.com/ugc/882976651020486774/F265CB501950E8EE518F253483B756C29F4C1004/", title: "Shovel Knight", body: "Sample game description goes here."},
{id: 2, image: "http://edge.alluremedia.com.au/m/k/2013/02/Super-Meat-Boy.jpeg", title: "Super Meat Boy", body: "More details describing game."},
{id: 3, image: "http://www.amnesiagame.com/images/splash_main.jpg", title: "Amnesia: The Dark Descent", body: "Details about this epic horror game."}
];

// show HTML file on main page
app.get("/", function (req, res) {
	res.sendFile(__dirname + "/public/view/index.html");
});

// serve js and css files from public folder
app.use(express.static(__dirname + "/public"));

app.get("/api/posts", function (req, res) {
	res.json(postArray);
});

app.post("/api/posts", function (req, res) {
	var newPost = req.body;
	if (postArray.length > 0) {
		newPost.id = postArray[postArray.length-1].id+1;
	} else {
		newPost.id = 0;
	}
	postArray.push(newPost);
	res.json(newPost);
});

app.put("/api/posts/:id", function (req, res) {
	var targetId = parseInt(req.params.id);
	var foundPost = _.findWhere(postArray, {id: targetId});
	foundPost.image = req.body.image;
	foundPost.title = req.body.title;
	foundPost.body = req.body.body;
	res.json(foundPost);
});

app.delete("/api/posts/:id", function (req, res) {
	var targetId = parseInt(req.params.id);
	var foundPost = _.findWhere(postArray, {id: targetId});
	var index = postArray.indexOf(foundPost);
	postArray.splice(index, 1);
	res.json(foundPost);
});

// listen on port 3000
app.listen(3000);