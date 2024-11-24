import { Sequelize } from "sequelize"; 

const sequelize = new Sequelize("bd_ts_example", "root", "05689471", {
  host: "localhost",
  dialect: "mysql", 
});

export default sequelize;
