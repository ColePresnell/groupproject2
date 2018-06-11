// this will not show anywhere as it is being run on client side

$(document).ready(function() {
    var homePitcher5SOs;

 // Code to get the users answers from database and get ready to be compared 




 $.get("/api/answersKey").then(function (data) {
 
        var answersToCompare = data[0].games.split(",")
        var gameIdNeededToCompare = answersToCompare[0].split(":") 
        var idToUse = gameIdNeededToCompare[1];
        
        gameIdNeededToCompareNoParen = idToUse.substr(1).slice(0,-1);
        // console.log(gameIdNeededToCompareNoParen);
        //==========================================================
        // get the user answer of who won game 
        // console.log(answersToCompare);
        var q1ToCompare = answersToCompare[1].split(":");
        var userAnswertoQ1 = q1ToCompare[1];
        answertoQ1NoParen = userAnswertoQ1.substr(1).slice(0,-1);
        // console.log(answertoQ1NoParen);
        //============================================================

        //get the user answer home pitcher will have more than 5 strike outs
        var q2ToCompare =answersToCompare[2].split(":");
        var userAnswertoQ2 = q2ToCompare[1];
         answertoQ2NoParen = userAnswertoQ2.substr(1).slice(0,-1);
        // console.log(answertoQ2NoParen);
        //===========================================================
         //get the user answer how many innings will away pitcher have 
         var q3ToCompare =answersToCompare[3].split(":");
         var userAnswertoQ3 = q3ToCompare[1];
         answertoQ3NoParen = userAnswertoQ3.substr(1).slice(0,-1);
        //  console.log(answertoQ3NoParen); 

        //===========================================================
         //get the user answer to will home team score more than 7 runs
         var q4ToCompare =answersToCompare[4].split(":");
         var userAnswertoQ4 = q4ToCompare[1];
         answertoQ4NoParen = userAnswertoQ4.substr(1).slice(0,-1);
        //  console.log(answertoQ4NoParen);
        //============================================================
         //will away team have more than 2 errors
         var q5ToCompare =answersToCompare[5].split(":");
         var userAnswertoQ5 = q5ToCompare[1];
         answertoQ5NoParen = userAnswertoQ5.substr(1).slice(0,-2);
        //  console.log(answertoQ5NoParen);

    




        

        

    
        // get game stats 
    var apikey = "yqad8vjknzntzcwypycn668e";
    
    //----
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    //-----
    var query = "http://api.sportradar.us/mlb/trial/v6.5/en/games/" + gameIdNeededToCompareNoParen + "/boxscore.json?api_key=" + apikey;

 

    var winningTeam;
    
    var homeTeam7runs;
    var awayTeam2Errors;
    var awayTeamHits;

    $.ajax({
        url: proxyUrl + query,
        method: "GET"
    }).then(function (response) {
        //console.log(response);
        //console.log(response.game);
        // get the abbrevations for teams 
        var homeTeam = response.game.home.abbr;
        var awayTeam = response.game.away.abbr;

       //get the number of runs for team 
        var awayTeamRuns = response.game.away.runs;
        var homeTeamRuns = response.game.home.runs;
        
        
        // check to see who won game
        if (awayTeamRuns > homeTeamRuns){
        winningTeam = awayTeam;
        }
        else {
        winningTeam = homeTeam;
        }; 
        
        // get the amount of away team hits 
        ;
        awayTeamHits = response.game.away.hits;
        
        //get home team runs 
        homeTeam7runs =  response.game.home.runs;
        //get away team errors
        awayTeam2Errors = response.game.away.errors;

        
    });




    //get pitcher stats
    var apikey = "t4mtkrmkmv68u9dx6gtbzpqa";
    
    //----
    var proxyUrl2 = 'https://cors.now.sh/';
    //-----
    var query2 = "http://api.sportradar.us/mlb/trial/v6.5/en/games/" + gameIdNeededToCompareNoParen + "/pitch_metrics.json?api_key=" + apikey;

 


    
    
    $.ajax({
        url: proxyUrl2 + query2,
        method: "GET"
    }).then(function (response) {
        
        
        
            var stats = response.game.home.players
            for (i = 0; i <stats.length; i++){
                var postion = response.game.home.players[i].primary_position;
                
            
                
                if (postion === "SP"){
                 homePitcher5SOs = response.game.home.players[i].statistics.pitch_metrics.overall.outs.ktotal; 
                }
            }
            
            setTimeout(function(){ 
            var score = 0;
            console.log(homePitcher5SOs);
            console.log(gameIdNeededToCompareNoParen);
            console.log(answertoQ1NoParen + "          Q1");
            console.log(answertoQ2NoParen + "          Q2");
            console.log(answertoQ3NoParen + "          Q3");
            console.log(answertoQ4NoParen + "          Q4");
            console.log(answertoQ5NoParen + "          Q5");
            console.log(winningTeam + "    Q1");
            console.log(awayTeam2Errors + "   Q5");
            console.log(awayTeamHits + "    Q3");
            console.log(homeTeam7runs + "    Q4");
            if (answertoQ1NoParen === winningTeam){
                score += 1;
            };
            if ((answertoQ2NoParen === "yes")&&(homePitcher5SOs > 5)){
                score += 1; 
            };
            if ((answertoQ2NoParen === "no")&&(homePitcher5SOs <5)){
                score += 1; 
            };
            
            if (answertoQ3NoParen == awayTeamHits){
                score += 1; 
            };
            
            if((answertoQ4NoParen === "yes")&& (homeTeam7runs > 7)){
                score += 1; 
            };
            if((answertoQ4NoParen === "no")&& (homeTeam7runs < 7)){
                score += 1; 
            };
            if((answertoQ5NoParen === "yes" ) && (awayTeam2Errors > 2)){
                score += 1; 
            };
            if((answertoQ5NoParen === "no" ) && (awayTeam2Errors < 2)){
                score += 1; 
            };
            
            
            console.log("Score: " + score);
            
        }, 3000);
            
            
    });
    

 });
 
});







