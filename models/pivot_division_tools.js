const Sequelize = require('sequelize');
const db = require('../config/config');

const pivot_division_tools = db.define('pivot_division_tools', {
    'idx' : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    'id_tools': Sequelize.INTEGER,
    'id_divisi': Sequelize.INTEGER
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = pivot_division_tools;