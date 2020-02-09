const Sequelize = require('sequelize'); 
const db = require('../config/config');

const organizations = db.define('org_structures', {
    'id_org_structures': {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    'nama_org_structures': Sequelize.STRING,
    'posisi_org_structures': Sequelize.STRING,
    'order_org_structures': Sequelize.INTEGER,
    'foto_org_structures': Sequelize.STRING,
}, {
    //prevent sequelize transform table name into plural
    freezeTableName: true,
    timestamps: false
});

module.exports = organizations;
