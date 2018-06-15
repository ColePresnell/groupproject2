$(document).ready(function () {
    var apikey = "yqad8vjknzntzcwypycn668e";

    var pathname = window.location.pathname;
    var splittingPathname = pathname.split('/');
    var game_id = splittingPathname[2];

    var query = 'https://cors-anywhere.herokuapp.com/' + "http://api.sportradar.us/mlb/trial/v6.5/en/games/" + game_id + "/boxscore.json?api_key=" + apikey;

    var home;
    var away;




    
    $.ajax({
        url: query,
        method: "GET"
    }).then(function (response) {
        $('.loader').hide();
        home = response.game.home;
        away = response.game.away;

        var homediv = $("<div>");
       
        homediv.append("Team:  " + home.abbr + " Win: " + home.win + " Loss: " + home.loss);
        homediv.append("Name:  " + home.probable_pitcher.first_name + "  " + home.probable_pitcher.last_name);
        homediv.append(" Win:  " + home.probable_pitcher.win + " lose:  " + home.probable_pitcher.loss + " era:  " + home.probable_pitcher.era);

        var awaydiv = $("<div>");
   
        awaydiv.append("Team: " + away.abbr + " Win: " + away.win + " Losses: " + away.loss);
        awaydiv.append("Name:  " + away.probable_pitcher.first_name + "  " + away.probable_pitcher.last_name);
        awaydiv.append(" Win:  " + away.probable_pitcher.win + " Losses:  " + away.probable_pitcher.loss + " era:  " + away.probable_pitcher.era);



        $("#info").append(homediv) + "\n";
        $("#info").append(awaydiv);


        //---- questions ------//
        var team = {
            h: home.abbr, //home team name
            a: away.abbr   //away team nmae
        };
        var pitcher = {
            h: home.probable_pitcher.preferred_name,
            a: away.probable_pitcher.preferred_name
        };



        //Question 1
        var textq1 = $("<p>");
        textq1.text("Who will win the game?");
        $(".q1").append(textq1);
        //drop down menu for home and away


        var selectQ1 = $("<select>");
        selectQ1.attr("id", "Q1");
        var optionQ1a = $("<option class='q1a'>");
        var optionQ1b = $("<option class='q1b'>");

        //giving option value and text
        $(".q1a").attr("value", team.h);
        optionQ1a.text(team.h);
        $(".q1b").attr("value", team.a);
        optionQ1b.text(team.a);

        selectQ1.append(optionQ1a);
        selectQ1.append(optionQ1b);
        $(".q1").append(selectQ1);







        //Question 2
        var textq2 = $("<p>");
        textq2.text("will " + pitcher.h + " have more than 5 Strikeouts today?")
        $(".q2").append(textq2);
        //boolean question for yes or no 
        //question is in bets.html

        var selectQ2 = $("<select>");
        selectQ2.attr("id", "Q2");
        var optionQ2a = $("<option class = 'q2a'>");
        var optionQ2b = $("<option class = 'q2b'>");

        $(".q2a").attr("value", "yes");
        optionQ2a.text("yes");
        $(".q2b").attr("value", "no");
        optionQ2b.text("no");

        selectQ2.append(optionQ2a);
        selectQ2.append(optionQ2b);
        $(".q2").append(selectQ2);
        


        //Question 3 
        var textq3 = $("<p>");
        textq3.text("How many hits will " + team.a + " have in todays game?");
        $(".q3").append(textq3);


        //drop down menu 1-9
        var selectQ3 = $("<select>");
        selectQ3.attr("id", "Q3");
        //var optionQ3 = $("<option>" + i + "</option>");

        for (var i = 1; i < 10; i++) {
            var optionQ3 = $("<option value='" + i + "'>" + i + "</option>");
            selectQ3.append(optionQ3);
            // $(".qq" +  i).attr("value", i);
            // optionQ3.append(i);
        }
        // selectQ3.append(optionQ3);
        $(".q3").append(selectQ3);




        //Question 4
        //appending the question to class q4. 
        var textq4 = $("<p>");
        textq4.text("Will " + team.h + "  score seven or more runs ? ");
        $(".q4").append(textq4);


        //creating select and option tag
        var selectQ4 = $("<select>");
        selectQ4.attr("id", "Q4");
        var optionQ4a = $("<option class='q4a'>");
        var optionQ4b = $("<option class='q4b'>");

        //giving option value and text
        $(".q4a").attr("value", "yes");
        optionQ4a.text("yes");
        $(".q4b").attr("value", "no");
        optionQ4b.text("no");

        selectQ4.append(optionQ4a);
        selectQ4.append(optionQ4b);
        $(".q4").append(selectQ4);



        //Question 5
        var textq5 = $("<p>");
        textq5.text("Will " + team.a + " have more than 2 errors in today's game? ");
        $(".q5").append(textq5);


        var selectQ5 = $("<select>");
        selectQ5.attr("id", "Q5");
        var optionQ5a = $("<option class = 'q5a'>");
        var optionQ5b = $("<option class = 'q5b'>");

        $(".q5a").attr("value", "yes");
        optionQ5a.text("yes");
        $(".q5b").attr("value", "no");
        optionQ5b.text("no");

        selectQ5.append(optionQ5a);
        selectQ5.append(optionQ5b);
        $(".q5").append(selectQ5);

    });

    console.log("finish loading")
    $(".submit").on("click", function (event) {
        event.preventDefault();
        var answers = {
            game_id: game_id,
            
            a1: $("#Q1").find(":selected").text(),
            a2: $("#Q2").find(":selected").text(),
            a3: $("#Q3").find(":selected").text(),
            a4: $("#Q4").find(":selected").text(),
            a5: $("#Q5").find(":selected").text()
 
 
        };
    

        //console.log(answers);
        console.log("going to post route");
        //need to create to database to send form(answers)
        $.post("/api/bets/"+game_id, answers,
            
            function (data) {
                console.log(data);
                if (data) {
                   $("#exampleModal").modal("modal");
                   // window.location.href="https://hidden-harbor-99196.herokuapp.com/members";
                //localhost
                window.location.href="http://localhost:8080/members/";
                }


                else {
                    console.log("error placing bet"); 
                }
               
            });

    });

    $("#close-btn").on("click", function (event) {
        event.preventDefault();
        $("#exampleModal").modal("hide")
        window.location.href="http://localhost:8080/members";
        // window.location.href="https://hidden-harbor-99196.herokuapp.com/members";
    })

}); 