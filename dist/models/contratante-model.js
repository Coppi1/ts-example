import { DataTypes, Model } from "sequelize";
import sequelize from "../shared/connection";
class Contratante extends Model {
}
Contratante.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nomeCompleto: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: "Contratante",
    tableName: "contratante",
    underscored: true, // Usa nomes de colunas com underscores (por padrão)
});
export default Contratante;
