const Sequelize = require('sequelize');
const db = require('../config/config');

const pivot_division_activities = db.define('pivot_division_activities', {
    'idx' : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    'id_activities': Sequelize.INTEGER,
    'id_divisi': Sequelize.INTEGER
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = pivot_division_activities;