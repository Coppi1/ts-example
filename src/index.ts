import express from "express";
import { Sequelize } from "sequelize";

// import contratanteRoutes from "./routes/contratante-routes.js";

import sequelize from "./shared/connection.js";

// import { Contratante } from "./models/contratante-model.js"; // it's not been used but it's necessary
const app = express();

app.use(express.json());

const PORT = 3000;

//routes here...
app.get("/", (req, res) => {
  res.status(200).send("UNIFIO Nodejs API now using ts");
});

//app.use("/", contratanteRoutes);

(async () => {
  try {
    console.log("Server is running on port ", PORT);
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
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
// Cleaner Code: Separating database connection and synchronization from the model file keeps the model focused on defining data structure.
// Easier Debugging: Centralized connection and synchronization logic make it easier to handle errors and debug issues related to database connectivity.
// Scalability: By not calling sync() inside each model file, you make it easier to scale the app when adding more models or handling more complex database interactions.

// This version improves both the maintainability and readability of your project.
export default app;
