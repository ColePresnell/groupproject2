$(document).ready(function () {

    var i = 0;
    var dataInfo;
    $.get("/api/answersKey").then(function (data){
        dataInfo = data;
        apiResponse1();
    });

    //spliting user answer from data
    function betsUserAnswer(){
        var answersToCompare = dataInfo[i].games.split(",");
        var gameIdNeededToCompare = answersToCompare[0].split(":");
        var idToUse = gameIdNeededToCompare[1];
        var gameIdNeededToCompareNoParen = idToUse.substr(1).slice(0, -1);
        //======Q1========//
        var q1ToCompare = answersToCompare[1].split(":");
        var userAnswertoQ1 = q1ToCompare[1];
        var answertoQ1NoParen = userAnswertoQ1.substr(1).slice(0, -1);
        //======Q2========//
        var q2ToCompare = answersToCompare[2].split(":");
        var userAnswertoQ2 = q2ToCompare[1];
        var answertoQ2NoParen = userAnswertoQ2.substr(1).slice(0, -1);
        //======Q3========//
        var q3ToCompare = answersToCompare[3].split(":");
        var userAnswertoQ3 = q3ToCompare[1];
        var answertoQ3NoParen = userAnswertoQ3.substr(1).slice(0, -1);
        //======Q4========//
        var q4ToCompare = answersToCompare[4].split(":");
        var userAnswertoQ4 = q4ToCompare[1];
        var answertoQ4NoParen = userAnswertoQ4.substr(1).slice(0, -1);
        //======Q5========//
        var q5ToCompare = answersToCompare[5].split(":");
        var userAnswertoQ5 = q5ToCompare[1];
        var answertoQ5NoParen = userAnswertoQ5.substr(1).slice(0, -2);


        var userAnswer = { 
            gameId: gameIdNeededToCompareNoParen,
            Q1 : answertoQ1NoParen,
            Q2 : answertoQ2NoParen,
            Q3 : answertoQ3NoParen,
            Q4 : answertoQ4NoParen,
            Q5 : answertoQ5NoParen
        }

        return userAnswer
        
    }



    function apiResponse1(){
        console.log("i equals " + i);
        var user = betsUserAnswer();
        //team information
        var apikey = "yqad8vjknzntzcwypycn668e";
        var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        var query = "http://api.sportradar.us/mlb/trial/v6.5/en/games/" + user.gameId + "/boxscore.json?api_key=" + apikey;

        $.ajax({
            url: proxyUrl + query,
            method: "GET"
        }).then(function (response) {

            apiResponse2(user, response);
            
        });



    }



    function apiResponse2(user, response) {
        var apikey = "t4mtkrmkmv68u9dx6gtbzpqa";
        var proxyUrl2 = 'https://cors.now.sh/';
        var query2 = "http://api.sportradar.us/mlb/trial/v6.5/en/games/" + user.gameId + "/pitch_metrics.json?api_key=" + apikey;

        $.ajax({
            url: proxyUrl2 + query2,
            method: "GET"
        }).then(function (response2) { 
            calculation(user, response, response2);
        });
    }

    function calculation(user, response, response2){
        var score = 0;

        //-- winning team
        var winningTeam; 
        var homeTeam = response.game.home.abbr;
        var awayTeam = response.game.away.abbr;

        //get the number of runs for team 
        var awayTeamRuns = response.game.away.runs;
        var homeTeamRuns = response.game.home.runs;

        if (awayTeamRuns > homeTeamRuns) {
            winningTeam = awayTeam;
        } else {
            winningTeam = homeTeam;
        };
        //-------------

        //--pircher info-- 
        var homePitcher5SOs;
        var stats = response2.game.home.players
        for (j = 0; j < stats.length; j++) {
            var postion = response2.game.home.players[j].primary_position;



            if (postion === "SP") {
               homePitcher5SOs = response2.game.home.players[j].statistics.pitch_metrics.overall.outs.ktotal;
            } //if
        } //forLoop

        //-----------------


        if(user.Q1 == winningTeam){
            score += 1;
        };
        if((user.Q2 =="yes") && (homePitcher5SOs > 5)){
            score += 1;
        };
        if((user.Q2 == "no") && (homePitcher5SOs < 5)){
            score += 1;
        };
        if(user.Q3 == response.game.away.hits) {
            score += 1;
        };
        if ((user.Q4 == "yes") && ( response.game.home.runs > 7)) {
            score += 1;
        };
        if ((user.Q4 == "no") && ( response.game.home.runs < 7)) {
            score += 1;
        };
        if ((user.Q5 == "yes") && ( response.game.away.errors > 2)) {
            score += 1;
        };
        if ((user.Q5 == "no") && ( response.game.away.errors < 2)) {
            score += 1;
        };

        var scoreObj = {
            username: dataInfo[i].username,
            score: score * 20
        };

        $.post("/api/leaderboard", scoreObj, function (response) {
            console.log(response);
            i++;
            if(i<dataInfo.length){
                setTimeout(apiResponse1,1000);
            }
        });





    }//calculation function



    





}); //closing $(document).ready(function)