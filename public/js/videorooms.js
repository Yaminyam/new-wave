var createRoom = document.getElementById('createRoom');
var rooms = document.getElementById('rooms');

// Create videorooms
createRoom.addEventListener('click', function (e) {
  var roomName = prompt('방이름을 입력하시오.', '');
  if (!roomName) {
    roomName = 'anonymity';
  }
  location.href = 'video/createRoom?roomName=' + roomName;
});

// Make videorooms list
for (let roomId in ROOMS_NAME) {
  var roomName = ROOMS_NAME[roomId];
  var item = document.createElement('li');
  item.textContent = `${roomName}`;
  item.addEventListener('click', function (e) {
    location.href = `video/${roomId}`;
  });
  rooms.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
}
