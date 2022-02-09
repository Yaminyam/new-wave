var express = require("express");
var router = express.Router();
var { v4: uuidV4 } = require("uuid");
var roomsName = {};

/*router.get("/", (req, res) => {
  res.redirect(`chat/${uuidV4()}`);
});*/

//비디오 html에 연결
// Connect to videolist.html
router.get("/", (req, res) => {
  res.render("videolist.html", { roomsName });
});

//영상 방 생성
// Create videoroom room
router.get("/createroom", (req, res) => {
  var roomId = uuidV4();
  roomsName[roomId] = req.query.roomName;
  console.log(roomsName);
  res.redirect(`${roomId}`);
});

//영상채팅방 html과 연결
// Connect to video.html
router.get("/:room", (req, res) => {
  res.render("video.html", {
    roomId: req.params.room,
    roomName: roomsName[req.params.room],
  });
});

module.exports = router;
