"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("@sequelize/mysql");
const core_1 = require("@sequelize/core");
const sequelize = new core_1.Sequelize({
    dialect: mysql_1.MySqlDialect,
    database: 'bd_ts_example',
    user: 'root',
    password: '1234',
    host: 'localhost',
    port: 3306,
});
exports.default = sequelize;
