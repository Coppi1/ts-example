"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize"); // Use sequelize ao invés de @sequelize/core
const sequelize = new sequelize_1.Sequelize("bd_ts_example", "root", "1234", {
    host: "localhost",
    dialect: "mysql", // Aqui você pode usar 'mysql'
});
exports.default = sequelize;
