const Sequelize = require('sequelize'); 
const db = require('../config/config');

const member_achievements = db.define('member_achievement', {
    'id_member': {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    'nama_member': Sequelize.STRING,
    'jurusan': Sequelize.STRING,
    'id_achievement': Sequelize.INTEGER
}, {
    //prevent sequelize transform table name into plural
    freezeTableName: true,
    timestamps: false
});

module.exports = member_achievements;
