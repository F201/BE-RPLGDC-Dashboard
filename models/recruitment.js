const Sequelize = require('sequelize'); 
const db = require('../config/config');

const recruitment = db.define('recruitment', {
    'id_recruitment': {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    'foto_profile': Sequelize.STRING,
    'nim': Sequelize.STRING,
    'nama_lengkap': Sequelize.STRING,
    'tanggal_lahir': Sequelize.STRING,
    'jenis_kelamin': Sequelize.STRING,
    'jurusan': Sequelize.STRING,
    'angkatan': Sequelize.STRING,
    'divisi': Sequelize.STRING,
    'cv': Sequelize.STRING,
    'motivation_letter': Sequelize.STRING,
    'portofolio': Sequelize.STRING,
    'status1': Sequelize.NUMBER,
    'status2': Sequelize.NUMBER
}, {
    //prevent sequelize transform table name into plural
    freezeTableName: true,
    timestamps: false
})

module.exports = recruitment;
