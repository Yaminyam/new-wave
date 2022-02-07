var express = require('express');
var router = express.Router();

//Connect to index.html
router.get('/', function(req, res, next) {
	  res.render('index.html');
});

module.exports = router;
