var socket = io();

var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');
var name = '';
// 접속 되었을 때 실행
socket.on('connect', function () {
  name = prompt('반갑습니다!', '');
  if (!name) {
    name = 'anonymity';
  }
  socket.emit('join-room-chat', ROOM_ID);
});

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', { message: input.value, name: name });
    input.value = '';
  }
});

socket.on('chat message', function (msg) {
  var item = document.createElement('li');
  item.textContent = `${msg.name}: ${msg.message}`;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
