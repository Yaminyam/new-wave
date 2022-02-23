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

// User out of the chat-room
socket.on('user-disconnected', (userId) => {
  if (peers[userId]) peers[userId].close();
});

// User connected room
mypeer.on('open', (id) => {
  console.log('My peer is open');
  socket.emit('join-room-video', ROOM_ID, id);
});

// Add video to others
function connectToNewUser(userId, stream) {
  console.log('connectToNewUser');
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

// Video connection
function addVideoStream(video, stream) {
  console.log('addVideoStream');
  video.srcObject = stream;
  video.addEventListener('loadedmetadata', () => {
    video.play();
  });
  videogrid.append(video);
}
