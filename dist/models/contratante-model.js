"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../shared/connection"));
class Contratante extends sequelize_1.Model {
}
Contratante.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nomeCompleto: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: connection_1.default,
    modelName: "Contratante",
    tableName: "contratante",
    underscored: true, // Usa nomes de colunas com underscores (por padrão)
});
exports.default = Contratante;
