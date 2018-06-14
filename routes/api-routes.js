// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
var currentUsername;
module.exports = function(app) {

  var sequelize = require("sequelize");
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/members");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username
    }).then(function() {
      res.redirect(307, "/api/login");
    }).catch(function(err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });


  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    
   
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      currentUsername = req.user.username;

      res.json({
        email: req.user.email,
        id: req.user.id,
        username: req.user.username
      });
    }
  });

  app.get("/api/leaderboard", function(req, res) {
    db.Results.findAll({
      order: [["score", "DESC"]],
      results: req.body.score

    }).then(function(data) {
      console.log(data);
      console.log("HELLO");
      res.json(data);
    }).catch(function(err) {
      console.log(err);
      res.json(err);
    });
  });

  app.post("/api/bets/:gameid", function(req, res) {
    console.log(req.params);
    console.log("answers: ",req.body);

    db.Useranswers.create({
      username: currentUsername ,
      games: JSON.stringify(req.body)
      
    })
    
    .then(function() {
      res.send(true);
    })
    
    .catch(function(err) {
      console.log(err);
      res.send(false);
      // res.status(422).json(err.errors[0].message);
    });


  });
  


  app.get("/api/answersKey", function(req, res) {
    db.Useranswers.findAll({
      
    }).then(function(data) {
      //console.log(data);
      res.json(data);
    }).catch(function(err) {
      console.log(err);
      res.json(err);
    })
  });
  
// post route to score table
// app.post("/api/leaderboard", function(req, res) {
//   console.log(req.body.score);

//   db.Results.create({
//     username: currentUsername ,
//     score: req.body.score
//     t
    
    
    
//   })
  
  // .then(function() {
  //   res.send(true);
  // })
  
  // .catch(function(err) {
  //   console.log(err);
  //   res.send(false);
    // res.status(422).json(err.errors[0].message);
  // });
  app.post("/api/leaderboard", function(req, res) {
    
    db.Results.find({where :{
      username: req.body.username,  
    } 
  }).then(function(response){
    console.log(response);
    if(!response){
      console.log("if");
    db.Results.create({
      username: req.body.username ,
      score: req.body.score, 
      totalGame: 1
      
      
    }).then(function() {
      res.send(true);
    })
    
    .catch(function(err) {
      console.log(err);
      res.send(false);
      // res.status(422).json(err.errors[0].message);
    });
  } // if statment  
  else { 
    
    console.log(response);
    console.log(response.score);
    console.log("user name: ", req.body.username);
    var score = parseInt(req.body.score);
    var previousScore = parseInt(response.score);
    console.log("current score: "+score+" previous score: "+previousScore);
    var percent = (score +previousScore ) / (response.totalGame+1)
    


    const newData = {  
   
      score:percent, 
      totalGame: response.totalGame+1
    }
    console.log(newData);

    db.Results.update(newData, {where: { username: req.body.username } }).then(function(){
      console.log("Updated score");
    }).catch(function(err){
      console.log(err);
    });

  }
  }).catch(function(err){
    console.log(err);
  });

  
  
  
  });
  

};


