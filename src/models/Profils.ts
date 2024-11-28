import { DataTypes } from "sequelize"
import sequelize from "../utils/sequelize"

const Profils = sequelize.define(
   "profils",
   {
      ID_PROFIL: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true,
      },
      NOM_PROFIL: {
         type: DataTypes.STRING(20),
         allowNull: false,
      },
   },
   {
      freezeTableName: true,
      tableName: "profils",
      timestamps: false,
   },
)
export default Profils
