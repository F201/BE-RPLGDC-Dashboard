const Sequelize = require('sequelize'); 
const db = require('../config/config');

const admin = db.define('admin', {
    'idx': {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    'username': Sequelize.STRING,
    'password' : Sequelize.STRING
}, {
    //prevent sequelize transform table name into plural
    freezeTableName: true,
    timestamps: false
});

module.exports = admin