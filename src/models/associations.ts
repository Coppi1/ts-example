import Job from "./Job";
import Payment from "./Payment";

Job.hasMany(Payment, { foreignKey: "jobId" });
Payment.belongsTo(Job, { foreignKey: "jobId" });
