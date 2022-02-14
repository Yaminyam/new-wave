//import { Socket } from "socket.io";
var socket = io();

var messages = document.getElementById('msg');
var gps = document.getElementById('map');
var page = document.getElementById('page');
var video = document.getElementById('video');



// On click, change page
messages.addEventListener('click', function (e) {
	page.src = '/chat';
});

gps.addEventListener('click', function (e) {
	page.src = '/gps';
});

video.addEventListener('click', function (e) {
	page.src = '/video';
});

// // On click, execute sos button
// function notifyMe() {
// 	if (!("Notification" in window)) {
// 	  alert("This browser does not support desktop notification");
// 	}
// 	else if (Notification.permission === "granted") {

// 	  var notification = new Notification("Someone needs help!");
	  

// 		if (true) {
// 		  notification.onclick = function(event){
// 			event.preventDefault(); // prevent the browser from focusing the Notification's tab
// 			window.open('/', '_blank');
// 			setTimeout(notification.close.bind(notification), 4000)};

// 		} else {
// 			console.log('okay');
// 		}
// 	  }
// 	}

// 	socket.emit('AlertNotification', '');
// 	console.log('send alert message to server');
// 	socket.on('ReceiveAlert',notifyMe())

	// else if (Notification.permission !== "denied") {
	//   Notification.requestPermission().then(function (permission) {
	// 	if (permission === "granted") {
	// 	  var notification = new Notification("Someone needs help!");
	// 	}
	//   });
	// }
