module.exports = function(sequelize, DataTypes) {
    var Useranswers = sequelize.define("Useranswers", {

        username: {
            type: DataTypes.STRING,
            allowNull: false
            
        }, 
            games: {
               type: DataTypes.STRING 
            }
            
            

    });
    return Useranswers;
};