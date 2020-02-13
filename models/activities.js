const Sequelize = require('sequelize'); 
const db = require('../config/config');

const activities = db.define('activities', {
    'id_activities': {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    'nama_activities': Sequelize.STRING,
    'tanggal': Sequelize.DATE,
    'gambar_activities': Sequelize.STRING,
    'deskripsi': Sequelize.STRING
}, {
    //prevent sequelize transform table name into plural
    freezeTableName: true,
    timestamps: false
});

module.exports = activities;
