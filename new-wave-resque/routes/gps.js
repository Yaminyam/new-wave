var express = require('express');
var router = express.Router();

// Connect to gps.html
router.get("/", function (req, res, next) {
	  res.render("gps.html");
});

module.exports = router;
