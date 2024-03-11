const { DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize');
const Profils = require('./Profils');

const Utilisateurs = sequelize.define('utilisateurs', {
     ID_UTILISATEUR: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
     },
     NOM: {
          type: DataTypes.STRING(50),
          allowNull: false
     },
     PRENOM: {
          type: DataTypes.STRING(50),
          allowNull: false
     },
     ID_PROFIL: {
          type: DataTypes.INTEGER,
          allowNull: false
     },
     IMAGE: {
          type: DataTypes.STRING,
          allowNull: true,
          defaultValue: null
     },
     EMAIL: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: null
     },
     MOT_DE_PASSE: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: null
     },
}, {
     freezeTableName: true,
     tableName: 'utilisateurs',
     timestamps: false
})

Utilisateurs.belongsTo(Profils, { as: 'profil', foreignKey: "ID_PROFIL" })

module.exports = Utilisateurs