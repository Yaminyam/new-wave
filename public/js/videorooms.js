var createRoom = document.getElementById("createRoom");
var rooms = document.getElementById("rooms");

createRoom.addEventListener("click", function (e) {
  var roomName = prompt("방이름을 입력하세요", "");
  location.href = "chat/createRoom?roomName=" + roomName;
});

for (let roomId in ROOMS_NAME) {
  var roomName = ROOMS_NAME[roomId];
  var item = document.createElement("li");
  item.textContent = `${roomName}`;
  item.addEventListener("click", function (e) {
    location.href = `chat/${roomId}`;
  });
  rooms.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
}