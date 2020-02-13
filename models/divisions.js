const Sequelize = require('sequelize'); 
const db = require('../config/config');

const divisions = db.define('divisions', {
    'id_divisi': {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    'nama_divisi': Sequelize.STRING,
    'gambar_divisi' : Sequelize.STRING,
    'deskripsi': Sequelize.STRING
}, {
    //prevent sequelize transform table name into plural
    freezeTableName: true,
    timestamps: false
});

module.exports = divisions;
