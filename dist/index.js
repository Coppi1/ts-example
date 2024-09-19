"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import contratanteRoutes from "./routes/contratante-routes.js";
const connection_js_1 = __importDefault(require("./shared/connection.js"));
// import { Contratante } from "./models/contratante-model.js"; // it's not been used but it's necessary
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = 3000;
//routes here...
app.get("/", (req, res) => {
    res.status(200).send("UNIFIO Nodejs API now using ts");
});
//app.use("/", contratanteRoutes);
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Server is running on port ", PORT);
        // Testar a conexão
        yield connection_js_1.default.authenticate();
        console.log("Database connected successfully.");
        // Sincronizar os modelos com o banco de dados
        yield connection_js_1.default.sync(); // Sincroniza os modelos
        console.log("Models synchronized with the database.");
        // Iniciar o servidor
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}))();
// Cleaner Code: Separating database connection and synchronization from the model file keeps the model focused on defining data structure.
// Easier Debugging: Centralized connection and synchronization logic make it easier to handle errors and debug issues related to database connectivity.
// Scalability: By not calling sync() inside each model file, you make it easier to scale the app when adding more models or handling more complex database interactions.
// This version improves both the maintainability and readability of your project.
exports.default = app;
