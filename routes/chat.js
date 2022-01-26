var express = require("express");
var router = express.Router();
var { v4: uuidV4 } = require("uuid");
var roomsName = {};

/*router.get("/", (req, res) => {
  res.redirect(`chat/${uuidV4()}`);
});*/

router.get("/", (req, res) => {
  res.render("chatlist.html", { roomsName });
});

router.get("/createroom", (req, res) => {
  var roomId = uuidV4();
  roomsName[roomId] = req.query.roomName;
  console.log(roomsName);
  res.redirect(`${roomId}`);
});

router.get("/:room", (req, res) => {
  res.render("chat.html", { roomId: req.params.room, roomName: roomsName[req.params.room] });
});

module.exports = router;
