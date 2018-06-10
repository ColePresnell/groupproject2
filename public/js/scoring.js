// this will not show anywhere as it is being run on client side
$(document).ready(function () {
 
    
    

    $.get("/api/answersKey").then(function (data) {
        console.log(data)
        //get the game id 
        var answersToCompare = data[0].games.split(",")
        var gameIdNeededToCompare = answersToCompare[0].split(":") 
        var idToUse = gameIdNeededToCompare[1];
        var gameIdNeededToCompareNoParen = idToUse.substr(1).slice(0,-1);
        // console.log(gameIdNeededToCompareNoParen);
        //==========================================================
        // get the user answer of who won game 
        // console.log(answersToCompare);
        var q1ToCompare = answersToCompare[1].split(":");
        var userAnswertoQ1 = q1ToCompare[1];
        var answertoQ1NoParen = userAnswertoQ1.substr(1).slice(0,-1);
        // console.log(answertoQ1NoParen);
        //============================================================

        //get the user answer home pitcher will have more than 5 strike outs
        var q2ToCompare =answersToCompare[2].split(":");
        var userAnswertoQ2 = q2ToCompare[1];
        var answertoQ2NoParen = userAnswertoQ2.substr(1).slice(0,-1);
        // console.log(answertoQ2NoParen);
        //===========================================================
         //get the user answer how mannying innings will away pitcher have 
         var q3ToCompare =answersToCompare[3].split(":");
         var userAnswertoQ3 = q3ToCompare[1];
         var answertoQ3NoParen = userAnswertoQ3.substr(1).slice(0,-1);
        //  console.log(answertoQ3NoParen); 

        //===========================================================
         //get the user answer to will home team score more than 7 runs
         var q4ToCompare =answersToCompare[4].split(":");
         var userAnswertoQ4 = q4ToCompare[1];
         var answertoQ4NoParen = userAnswertoQ4.substr(1).slice(0,-1);
        //  console.log(answertoQ4NoParen);
        //============================================================
         //get the user answer home pitcher will have more than 5 strike outs
         var q5ToCompare =answersToCompare[5].split(":");
         var userAnswertoQ5 = q5ToCompare[1];
         var answertoQ5NoParen = userAnswertoQ5.substr(1).slice(0,-1);
        //  console.log(answertoQ5NoParen);



        
        
        



    var apikey = "yqad8vjknzntzcwypycn668e";
    
    //----
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    //-----
    var query = "http://api.sportradar.us/mlb/trial/v6.5/en/games/" + gameIdNeededToCompareNoParen + "/boxscore.json?api_key=" + apikey;

 



    // $.ajax({
    //     url: proxyUrl + query,
    //     method: "GET"
    // }).then(function (response) {
    //     console.log(response);
    //     console.log(response.game);
    //     var winningTeam;
    //     var homeTeam = response.game.home.abbr;
    //     var awayTeam = response.game.away.abbr;

       
    //     var awayTeamRuns = response.game.away.runs;
    //     var homeTeamRuns = response.game.home.runs;
    //     if (awayTeamRuns > homeTeamRuns){
    //     winningTeam = awayTeam
    //     }
    //     else {
    //         winningTeam= homeTeam;
    //     }
    //     console.log("winning team: " + winningTeam)

    // });



    });


    



});