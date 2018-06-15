$(document).ready(function () {


    

    var apikey = "xksqy5yzud2g255rumfjf5ga";
    var today = new Date();
    var formateToday = moment(today).format('YYYY/MM/DD');
    //var testData = "2018/06/11";
    //-------
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/';


    //-----

    var targetUrl = "https://api.sportradar.us/mlb/trial/v6.5/en/games/" + formateToday + "/schedule.json?api_key=" + apikey;


    $.get(proxyUrl + targetUrl, function (response) {
        $('.loader').hide();
        var isThereGames = false;
        for (var i = 0; i < response.games.length; i++) {

           
            if (response.games[i].status === "scheduled") {
                var button = $("<button>");
                console.log(response.games[i].status)
                button.append(response.games[i].home.name + "   vs  " + response.games[i].away.name);
                button.attr("id", response.games[i].id);

                button.attr("class", "eachGame");
                button.attr("href", "/bets/" + response.games[i].id);

                $("#overallContain").append(button);
                isThereGames = true;

            }
        };

        if (isThereGames === false) {
            $("#overallContain").append("There are no games today. Try again tommorrow");
        }

    })


    $("#overallContain").on("click", ".eachGame", function () {
        console.log("test");
        $(this).css("display", "none");

        var game_id = $(this).attr("id");
        window.location.href = "https://hidden-harbor-99196.herokuapp.com/bets/" + game_id;
       //for local host
        //window.location.href="http://localhost:8080/bets/"+game_id;

    });
    // $("#overallContain").on("click", ".eachGame", function () {
    //     console.log("test");

    //     var game_id = $(this).attr("id");



    //window.location.href="http://localhost:8080/bets/"+game_id;

    // $.get(proxyUrl+"http://api.sportradar.us/mlb/trial/v6.5/en/games/" + game_id + "/boxscore.json?api_key=" + apikey, function(req, res ){
    //     console.log(response);



    // }) 

});