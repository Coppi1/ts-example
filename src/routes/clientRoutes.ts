import { Router } from "express";
import { ClientController } from "../controllers/clientController";

const router = Router();
const clientController = new ClientController();

router.post("/client", (req, res) => clientController.createClient(req, res));
router.get("/clients", (req, res) => clientController.getAllClients(req, res));
router.get("/client/:id", (req, res) =>
  clientController.getClientById(req, res)
);
router.put("/client/:id", (req, res) =>
  clientController.updateClient(req, res)
);
router.delete("/client/:id", (req, res) =>
  clientController.deleteClient(req, res)
);

export default router;
