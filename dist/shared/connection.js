import { Sequelize } from "sequelize";
const sequelize = new Sequelize("bd_ts_example", "root", "1234", {
    host: "localhost",
    dialect: "mysql",
});
export default sequelize;
