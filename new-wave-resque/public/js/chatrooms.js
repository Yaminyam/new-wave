var createRoom = document.getElementById('createRoom');
var rooms = document.getElementById('rooms');

// Create chatrooms
createRoom.addEventListener('click', function (e) {
  var roomName = prompt('Set room name', '');
  if (!roomName) {
    roomName = 'anonymity';
  }
  location.href = 'chat/createRoom?roomName=' + roomName;
});

// Make chatrooms list
for (let roomId in ROOMS_NAME) {
  var roomName = ROOMS_NAME[roomId];
  var item = document.createElement('li');
  item.textContent = `${roomName}`;
  item.addEventListener("click", function (e) {
    location.href = `chat/${roomId}`;
  });
  rooms.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
}
