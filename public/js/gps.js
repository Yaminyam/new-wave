var socket = io();

var map = L.map('map').fitWorld();

var alarm = document.getElementById('alarm');

var name = '';

L.tileLayer(
  'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: "mapbox/streets-v11",
    maxZoom: 18,
    tileSize: 512,
    zoomOffset: -1,
  }
).addTo(map);

// Perform when user connected
socket.on('connect', function () {
  name = prompt('your name', '');
  if (!name) {
    name = 'anonymity';
  }
  socket.emit('gps_ID', { name: name });
});

socket.on('gps_ID', onLocationFound)

// Register event when server found user's location
function onLocationFound(e) {
  var radius = e.accuracy * 3;

  L.marker(e.latlng).addTo(map).bindPopup(name).openPopup();

  L.circle(e.latlng, radius).addTo(map);

  socket.emit('gpsNewUser', e.latlng);
}
map.on('locationfound', onLocationFound);

// Receive new user information
// Mark a location
socket.on('gpsNewUser', function (latlng) {
  L.marker(latlng).addTo(map).bindPopup('name123').openPopup();
});

// Register event when server couldn't find user's location
function onLocationError(e) {
  alert(e.message);
}
map.on('locationerror', onLocationError);

// Zoom in, Zoom out on the map
map.locate({ setView: true, maxZoom: 16 });

// Add event to button
alarm.addEventListener('click', () => {
  //일단 alert라는 이름의 아무것도 없는 정보 서버에 보내기
  console.log('1');
  socket.emit('alertNotification','click');
  console.log('2');
  socket.emit('colorChange','click');
});

socket.on('alert',notifyMe);
socket.on('alert',colorChange);

// On click, execute sos button
function notifyMe() {
	if (!("Notification" in window)) {
	  alert("This browser does not support desktop notification");
	}
	else if (Notification.permission === "granted") {
	  var notification = new Notification("Someone needs help!");
	  notification.onclick = function(event){
      event.preventDefault(); // prevent the browser from focusing the Notification's tab
      window.open('/', '_blank');
      setTimeout(notification.close.bind(notification), 4000);
	  }
	}
	else if (Notification.permission !== "denied") {
	  Notification.requestPermission().then(function (permission) {
		if (permission === "granted") {
		  var notification = new Notification("Someone needs help!");
		}
	  });
	}
}

function colorChange(){
  console.log('5');
  const collection = document.getElementsByClassName("leaflet-popup-content-wrapper");
  for (let i = 0; i < collection.length; i++) {
    collection[i].style.backgroundColor = "red";
  }
  const element = document.getElementsByClassName("leaflet-popup-tip");
  for (let i = 0; i < collection.length; i++) {
    element[i].style.backgroundColor = "red";
  }
  // const collection = document.getElementsByClassName('leaflet-popup-tip');
  // collection.style.backgroundColor="red";
  // .leaflet-popup-tip.style.background = red;
}
