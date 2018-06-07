$(document).ready(function(){



    var apikey = "yqad8vjknzntzcwypycn668e";
    var today = new Date();
    var formateToday = moment(today).format('YYYY/MM/DD');
    //-------
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/';


    //-----
    
    var targetUrl = "https://api.sportradar.us/mlb/trial/v6.5/en/games/"+formateToday+"/schedule.json?api_key="+apikey;
    
    
    $.get(proxyUrl + targetUrl, function(response) {
        
        for(var i = 0; i < response.games.length; i++){
            var button  = $("<button>")
            
            button.append(response.games[i].home.name + "   vs  " + response.games[i].away.name);
            button.attr("id",response.games[i].id);
            
            button.attr("class","eachGame");
            button.attr("href","/bets/"+response.games[i].id);
    
           $("#overallContain").append(button);
    
    
        
        }
            
    })
    

    $("#overallContain").on("click", ".eachGame", function () {
        console.log("test");
    
        var game_id = $(this).attr("id");
        window.location.href="http://localhost:8080/bets/"+game_id;

})
// $("#overallContain").on("click", ".eachGame", function () {
//     console.log("test");

//     var game_id = $(this).attr("id");
  


    // window.location.href="http://localhost:8080/bets/"+game_id;

    // $.get(proxyUrl+"http://api.sportradar.us/mlb/trial/v6.5/en/games/" + game_id + "/boxscore.json?api_key=" + apikey, function(req, res ){
    //     console.log(response);

      

    // }) 

   })