var socket = io();

var messages = document.getElementById("messages");
var form = document.getElementById("form");
var input = document.getElementById("input");
var name = "";
/* 접속 되었을 때 실행 */
socket.on("connect", function () {
  /* 이름을 입력받고 */
  name = prompt("반갑습니다!", "");

  /* 이름이 빈칸인 경우 */
  if (!name) {
    name = "익명";
  }
  socket.emit("join-room", ROOM_NAME);
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", { message: input.value, name: name });
    input.value = "";
  }
});

socket.on("chat message", function (msg) {
  var item = document.createElement("li");
  item.textContent = `${msg.name}: ${msg.message}`;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
