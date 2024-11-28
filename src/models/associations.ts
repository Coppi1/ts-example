import { Association } from "sequelize";
import Client from "./Profile.js";
import Deposit from "./Deposit.js";
import Job from "./Job.js";
import Payment from "./Payment.js";


Job.hasMany(Payment, { foreignKey: "jobId" });
Payment.belongsTo(Job, { foreignKey: "jobId" });

Client.hasMany(Deposit, { foreignKey: "clientId" });
Deposit.belongsTo(Client, { foreignKey: "clientId" });

export default Association;