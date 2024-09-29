import { Sequelize } from "sequelize"; // Use sequelize ao invés de @sequelize/core
const sequelize = new Sequelize("bd_ts_example", "root", "05689471", {
    host: "localhost",
    dialect: "mysql", // Aqui você pode usar 'mysql'
});
export default sequelize;
