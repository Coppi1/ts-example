import { Router } from "express";
import { ContratanteController } from "../controllers/contratante-controller";

const router = Router();
const contratanteController = new ContratanteController();

router.post("/contratante", (req, res) =>
  contratanteController.createContratante(req, res)
);
router.get("/contratantes", (req, res) =>
  contratanteController.getAllContratantes(req, res)
);
router.get("/contratante/:id", (req, res) =>
  contratanteController.getContratanteById(req, res)
);
router.put("/contratante/:id", (req, res) =>
  contratanteController.updateContratante(req, res)
);
router.delete("/contratante/:id", (req, res) =>
  contratanteController.deleteContratante(req, res)
);

export default router;
