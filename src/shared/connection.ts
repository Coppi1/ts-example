import { Sequelize } from "sequelize"; 

const sequelize = new Sequelize("bd_ts_example", "postgres", "0208", {
  host: "localhost",
  dialect: "postgres", 
});

export default sequelize;
