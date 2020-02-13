const Sequelize = require('sequelize'); 
const db = require('../config/config');

const news = db.define('news', {
    'id_news': {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    'judul': Sequelize.STRING,
    'gambar': Sequelize.STRING,
    'deskripsi': Sequelize.STRING,
    'link_url': Sequelize.STRING
}, {
    //prevent sequelize transform table name into plural
    freezeTableName: true,
    timestamps: false
});

module.exports = news;
