const Sequelize = require('sequelize'); 
const db = require('../config/config');

const highscore = db.define('highscore_game', {
    'idx': {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    'nim': Sequelize.INTEGER,
    'score' : Sequelize.INTEGER
}, {
    //prevent sequelize transform table name into plural
    freezeTableName: true,
    timestamps: false
});

module.exports = highscore;
