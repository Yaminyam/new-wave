var socket = io();

var map = L.map('map').fitWorld();

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

// 사용자 위치 찾았을때 수행할 이벤트 등록
function onLocationFound(e) {
  var radius = e.accuracy * 3;

  L.marker(e.latlng).addTo(map).bindPopup('name').openPopup();

  L.circle(e.latlng, radius).addTo(map);

  console.log('send e');
  console.log(e);
  socket.emit('gpsNewUser', e.latlng);
}
map.on('locationfound', onLocationFound);

socket.on('gpsNewUser', function (latlng) {
  // console.log("recieve");
  L.marker(latlng).addTo(map).bindPopup('name123').openPopup();
});

// 사용자 위치 찾지 못했을 때 수행할 이벤트 등록
function onLocationError(e) {
  alert(e.message);
}
map.on('locationerror', onLocationError);

map.locate({ setView: true, maxZoom: 16 });
