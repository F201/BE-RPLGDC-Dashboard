const Sequelize = require('sequelize'); 
const db = require('../config/config');

const socials = db.define('socials', {
    'id_social': {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    'type': Sequelize.STRING,
    'value': Sequelize.STRING
}, {
    //prevent sequelize transform table name into plural
    freezeTableName: true,
    timestamps: false
});

module.exports = socials;
