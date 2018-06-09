// this will not show anywhere as it is being run on client side
$(document).ready(function () {
 
    var thisData; 
    var thisNumber;
    

    $.get("/api/user_data").then(function (data) {
        console.log(data);
        thisData = data.id;


    })
    var apikey = "yqad8vjknzntzcwypycn668e";
    var pathname = window.location.pathname;
    var splittingPathname = pathname.split("/");
    var game_id = splittingPathname[2];
    //----
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    //-----
    var query = "http://api.sportradar.us/mlb/trial/v6.5/en/games/" + "1236599e-a39a-40d9-8889-3d614280d1d9" + "/boxscore.json?api_key=" + apikey;

    var home;
    var away;




    $.ajax({
        url: proxyUrl + query,
        method: "GET"
    }).then(function (response) {
        console.log(response.game.attendance)
        thisNumber = response.game.attendance;
        if (thisData != thisNumber) {
            console.log("yay working")
        }
        else {
            console.log("damn")
        }


    });




});