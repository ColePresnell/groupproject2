$(document).ready(function() {
$.get("/api/leaderboard", function(data) {
console.log(data)
});
});