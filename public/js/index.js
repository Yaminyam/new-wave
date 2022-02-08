var messages = document.getElementById('msg');
var gps = document.getElementById('map');
var page = document.getElementById('page');
var video = document.getElementById('video');
var Alarm = document.getElementById('Alarm');

messages.addEventListener('click', function (e) {
	page.src = '/chat';
});

gps.addEventListener('click', function (e) {
	page.src = '/gps';
});

video.addEventListener('click', function (e) {
	page.src = '/video';
});

// 사용자 알림 권한 허용받기
// Get user authorization permission 
Notification.requestPermission();

// // 알림 내용
// //alarm content
// new Notification("Alarm", {body:'Someone needs help'});

Alarm.addEventListener('click', function (e) {
	new Notification("Alarm", {body:'Someone needs help'});
  });