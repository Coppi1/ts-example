
import { MySqlDialect } from '@sequelize/mysql';
import { Sequelize } from '@sequelize/core';

const sequelize = new Sequelize({
    dialect: MySqlDialect,
    database: 'bd_ts_example',
    user: 'root',
    password: '1234',
    host: 'localhost',
    port: 3306,
  });

export default sequelize;
