$(document).ready(function () {
    
   
    var apikey = "yqad8vjknzntzcwypycn668e";
    var pathname = window.location.pathname;
    var splittingPathname = pathname.split("/");
    var game_id = splittingPathname[2];

    var query = "http://api.sportradar.us/mlb/trial/v6.5/en/games/" + game_id + "/boxscore.json?api_key=" + apikey;

    var home;
    var away;




    $.ajax({
        url: query,
        method: "GET"
    }).then(function (response) {
        home = response.game.home;
        away = response.game.away;

        var homediv = $("<div>");
        homediv.append("Team:  " + home.abbr + " Win: " + home.win + " Losses: " + home.loss);
        homediv.append("Name:  " + home.probable_pitcher.first_name + "  " + home.probable_pitcher.last_name);
        homediv.append("win:  " + home.probable_pitcher.win + " Losses:  " + home.probable_pitcher.loss + " era:  " + home.probable_pitcher.era);

        var awaydiv = $("<div>");
        awaydiv.append("Team: " + away.abbr + " Win: " + away.win + " Losses: " + away.loss);
        awaydiv.append("Name:  " + away.probable_pitcher.first_name + "  " + away.probable_pitcher.last_name);
        awaydiv.append("win:  " + away.probable_pitcher.win + " Losses:  " + away.probable_pitcher.loss + " era:  " + away.probable_pitcher.era);



        $("#info").append(homediv) + "\n";
        $("#info").append(awaydiv);


        //---- questions ------//
        var team = {
            h: home.abbr, //home team name
            a: away.abbr //away team nmae
        };
        var pitcher = {
            h: home.probable_pitcher.preferred_name,
            a: away.probable_pitcher.preferred_name
        };
        var questionDiv = $("<div>");
        var select = $("<select>");

        var option = $("<option>");
        option.innerHTML = team.h;
        var option2 = $("<option>")
        option2.innerHTML = team.a;

        

        questionDiv.append("Who will win the game?");
        //drop down menu for home and away
        select.append(option)
        var quest2 = select.append(option2)

        questionDiv.append(quest2)


        questionDiv.append("will " + pitcher.h + " have 5 Strike outs?");
        // boolean yes or no 
        questionDiv.append("How many innings will " + pitcher.a + " play in today's game?")
        //drop down menu 1-9









    });



});
