import dotenv from "dotenv";
import express from "express";
import "./models/associations.js";
import clientRoutes from "./routes/clientRoutes.js";
import contractRoutes from "./routes/contractRoutes.js";
import contractorRoutes from "./routes/contractorRoutes.js";
import depositRoutes from "./routes/depositRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import sequelize from "./shared/connection.js";
// Carrega arquivo .env
dotenv.config();
const app = express();
app.use(express.json());
//const PORT = 3000;
const PORT = process.env.PORT;
// Rotas
app.get("/", (req, res) => {
  res.status(200).send("API server ON");
});
// Usando as rotas
app.use("/", clientRoutes);
app.use("/", contractRoutes);
app.use("/", contractorRoutes);
app.use("/", depositRoutes);
app.use("/", jobRoutes);
app.use("/", paymentRoutes);
(async () => {
  try {
    // Testar a conexão
    await sequelize.authenticate();
    console.log("Database connected successfully.");
    // Sincronizar os modelos com o banco de dados
    await sequelize.sync();
    console.log("Models synchronized with the database.");
    // Iniciar o servidor
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
export default app;
