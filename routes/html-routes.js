// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
var db = require("../models");
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

  app.get("/", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    } else {
      res.render("signup");
    };
  });

  app.get("/login", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    } else {
      res.render("login");
    };
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function (req, res) {
    res.render("members");
  });

  app.get("/games", isAuthenticated, function (req, res) {
    res.render("games");
  });



  app.get("/leaderboard", isAuthenticated, function (req, res) {

    db.Results.findAll({
      order: [
        ["score", "DESC"]
      ],


    }).then(function (data) {
      //this was added for handlebars to work on leaderboard to display results
      var hbsObject = {
        results: data
      };
      console.log(hbsObject);




      res.render("leaderboard", hbsObject);
    });

  });
  //for bets html

  // app.get("/bets/:id", function (req, res) {

  //   console.log("");
  //   res.render("bets");
  // });

  app.get("/scoring", isAuthenticated, function (req, res) {
    res.render("scoring");
  });

  app.get("/signup", function (req, res) {
    res.render("signup")
  });

  app.get("/bets/:id", function (req, res) {
   
    console.log(req.user);
    
    db.Useranswers.findAll({
        where: {
          username: req.user.username
        }
      
    })
      .then(function (dbResponse) {
      
        console.log("Here")
        
           for (i = 0; i < dbResponse.length; i++) {
             console.log("Here2")
           var gameIdArr = dbResponse[i].games.slice(12,48);
          console.log(gameIdArr);
          console.log(req.params.id)
         }
        if (typeof gammeIdArr ==="undefined"){
          console.log("here2.5");
          res.render("bets");
          return ; 

        }
        if (gameIdArr.includes(req.params.id)) {
          console.log("here3");
          res.send("you betted already sorry");
          
        } else {
          console.log("here4")
          res.render("bets");
        }
      })
      // .catch(function (err) {
      //   console.log("here5")
      //   res.json(err);
      // });

    //     console.log("");
       
    });
  
}
