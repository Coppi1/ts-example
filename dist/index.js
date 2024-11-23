import express from "express";
import "./models/associations.js";
import clientRoutes from './routes/clientRoutes.js';
import contractRoutes from './routes/contractRoutes.js';
import contractorRoutes from './routes/contractorRoutes.js';
import depositRoutes from './routes/depositRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import sequelize from './shared/connection.js';
import dotenv from 'dotenv';
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
// Usando as rotas do contratante
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
        await sequelize.sync(); // Sincroniza os modelos
        console.log("Models synchronized with the database.");
        // Iniciar o servidor
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }
})();
// Cleaner Code: Separating database connection and synchronization from the model file keeps the model focused on defining data structure.
// Easier Debugging: Centralized connection and synchronization logic make it easier to handle errors and debug issues related to database connectivity.
// Scalability: By not calling sync() inside each model file, you make it easier to scale the app when adding more models or handling more complex database interactions.
// This version improves both the maintainability and readability of your project.
export default app;
