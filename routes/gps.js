var express = require('express');
var router = express.Router();

<<<<<<< HEAD
router.get("/", function (req, res, next) {
	  res.render("gps.html");
=======
router.get('/', function(req, res, next) {
	  res.render('gps.html');
>>>>>>> 37910c5f2de5de482c17e42ceac877ace9eaeb35
});

module.exports = router;
