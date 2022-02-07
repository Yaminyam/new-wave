const socket = io();
const videogrid = document.getElementById('video-grid');
const mypeer = new Peer(undefined, {
  host: '/',
  port: '3001',
});

const myvideo = document.createElement('video');
myvideo.muted = true;
const peers = {};

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

socket.on('user-disconnected', (userId) => {
  if (peers[userId]) peers[userId].close();
});

mypeer.on('open', (id) => {
  socket.emit('join-room-video', ROOM_ID, id);
});

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

function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener('loadedmetadata', () => {
    video.play();
  });
  videogrid.append(video);
}
