module.exports = function(sequelize, DataTypes) {
  var Results = sequelize.define("Results", {
    // The email cannot be null, and must be a proper email before creation
    
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    score: {
        type: DataTypes.FLOAT(6, 2),
    }, 
    totalGame: {
      type: DataTypes.INTEGER
    }

    // Depending on how we are progessing, I think it would be good to put a "winnings" column (and possibly "Wager" column) as well, assuming we are still incorporating the betting aspect of the app //
    
  })
  return Results;
};