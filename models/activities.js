const Sequelize = require('sequelize'); 
const db = require('../config/config');

const activities = db.define('activities', {
    'id_activity': {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    'judul': Sequelize.STRING,
    'id_divisi': Sequelize.INTEGER,
    'tag_kegiatan': Sequelize.STRING,
    'date': Sequelize.DATE,
    'image': Sequelize.STRING,
}, {
    //prevent sequelize transform table name into plural
    freezeTableName: true,
    timestamps: false
});

module.exports = activities;
