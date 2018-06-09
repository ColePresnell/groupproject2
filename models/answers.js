module.exports = function(sequelize, DataTypes) {
    var Useranswers = sequelize.define("Useranswers", {

        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        }, 
            game1: {
               type: DataTypes.STRING 
            },
            game2: {
                type: DataTypes.STRING 
             },
             game3: {
                type: DataTypes.STRING 
             },
             game4: {
                type: DataTypes.STRING 
             },
             game5: {
                type: DataTypes.STRING 
             },
             date: {
                 type: DataTypes.DATE
             }
            

    });
    return Useranswers;
};