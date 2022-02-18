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
  var io = req.app.get("io");
  var rooms = getActiveRooms(io);
  console.log(io.sockets.adapter.rooms);
  console.log(rooms);
  var newRoomsName = {};
  for (let roomId in roomsName) {
    if (rooms.includes(roomId)) {
      newRoomsName[roomId] = roomsName[roomId];
    }
  }
  console.log("newRooms");
  console.log(newRoomsName);
  roomsName = newRoomsName;
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

// Make room list
function getActiveRooms(io) {
  // Convert map into 2D list:
  // ==> [['4ziBKG9XFS06NdtVAAAH', Set(1)], ['room1', Set(2)], ...]
  const arr = Array.from(io.sockets.adapter.rooms);
  // Filter rooms whose name exist in set:
  // ==> [['room1', Set(2)], ['room2', Set(2)]]
  const filtered = arr.filter((room) => !room[1].has(room[0]));
  // Return only the room name:
  // ==> ['room1', 'room2']
  const res = filtered.map((i) => i[0]);
  return res;
}

module.exports = router;
