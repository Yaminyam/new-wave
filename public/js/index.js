var messages = document.getElementById("msg");
var gps = document.getElementById("map");
var page = document.getElementById("page");

messages.addEventListener("click", function (e) {
	page.src = "/chat";
});

gps.addEventListener("click", function (e) {
	page.src = "/gps";
});