const Sequelize = require('sequelize');
const db = require('../config/config');

const tools = db.define('tools', {
    'id_tools' : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    'nama_tools': Sequelize.STRING,
    'gambar_tools': Sequelize.STRING
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = tools;