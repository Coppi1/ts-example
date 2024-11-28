import { Router } from "express";
import { ContractorController } from "../controllers/contractorController.js";

const router = Router();
const contractorController = new ContractorController();

router.post("/contractor", (req, res) =>
  contractorController.createContractor(req, res)
);
router.get("/contractors", (req, res) =>
  contractorController.getAllContractors(req, res)
);
router.get("/contractor/:id", (req, res) =>
  contractorController.getContractorById(req, res)
);
router.put("/contractor/:id", (req, res) =>
  contractorController.updateContractor(req, res)
);
router.delete("/contractor/:id", (req, res) =>
  contractorController.deleteContractor(req, res)
);

export default router;
