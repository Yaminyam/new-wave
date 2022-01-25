var express = require('express');
var router = express.Router();
var { v4: uuidV4 } = require("uuid");

router.get("/", (req, res) => {
  res.redirect(`chat/${uuidV4()}`);
});

router.get("/:room", (req, res) => {
  	res.render("chat.html", { roomId: req.params.room });
});

module.exports = router;

