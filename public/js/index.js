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

// 알림 내용
//alarm content
Alarm.addEventListener('click', function (e) {
	new Notification("Alarm", {body:'Someone needs help'});
	//4초있다가 꺼질 것임
	setTimeout(notification.close.bind(notification), 4000);
	
	//클릭 이벤트
	notification.addEventListener("click", function (event) {
		alert("onClick!");
		//event.preventDefault();
		console.log('Notification clicked.');
	})

	//알림 클릭시 페이지 연동
	notification.onclick = function(event) {
		//event.preventDefault(); // prevent the browser from focusing the Notification's tab
		window.open('http://www.mozilla.org', '_blank');
	  }
	  
	//닫힘 이벤트 
	notification.addEventListener("close", function (event) {
		alert("onClose!");
		//event.preventDefault();
		console.log('Notification clicked.');
	})
  });