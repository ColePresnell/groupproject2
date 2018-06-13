$(document).ready(function() {
$.get("/api/leaderboard", function(data) {
    console.log(data)
    
    
    
    
    // db.Results.findAll({
    //   order: [["score", "DESC"]]
    // }).then(function(data) {
    //   console.log(data);
    //   console.log("HELLO");
    //   res.json(data);
    // }).catch(function(err) {
    //   console.log(err);
    //   res.json(err);
    // });
  });
});

// $.get("/leaderboard", function(req, res) {
//     res.render("all results", {
//         username: username,
//         score: score
//     });
// });