/*
implement webRTC using P2P communication
*/

const socket = io();
const videogrid = document.getElementById('video-grid');
const mypeer = new Peer(undefined, {
  host: '/',
  port: '3001',
});


const myvideo = document.createElement('video');
myvideo.muted = true;
const peers = {};

//미디어 입력 장치에 접근
// Access to media input device
navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    addVideoStream(myvideo, stream);

    mypeer.on('call', (call) => {
      call.answer(stream);
      const video = document.createElement('video');
      call.on('stream', (userstream) => {
        addVideoStream(video, userstream);
      });
    });

    socket.on('user-connected', (userId) => {
      connectToNewUser(userId, stream);
    });
  });

//유저 연결안될 때
//perform when user disconnected
socket.on('user-disconnected', (userId) => {
  if (peers[userId]) peers[userId].close();
});

//유저 연결시
//perform when user connected
mypeer.on('open', (id) => {
  socket.emit('join-room-video', ROOM_ID, id);
});

//새로운 유저 연결하는 기능
//connect new user to an existing user
function connectToNewUser(userId, stream) {
  const call = mypeer.call(userId, stream);
  const video = document.createElement('video');
  call.on('stream', (userstream) => {
    addVideoStream(video, userstream);
  });
  call.on('close', () => {
    video.remove();
  });
  peers[userId] = call;
}

//영상 송출 기능
//video transmission
function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener('loadedmetadata', () => {
    video.play();
  });
  videogrid.append(video);
}