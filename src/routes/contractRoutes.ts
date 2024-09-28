import { Router } from "express";
import { ContractController } from "../controllers/contractController";

const router = Router();
const contractController = new ContractController();

router.post("/contract", (req, res) =>
  contractController.createContract(req, res)
);
router.get("/contracts", (req, res) =>
  contractController.getAllContracts(req, res)
);
router.get("/contract/:id", (req, res) =>
  contractController.getContractById(req, res)
);
router.put("/contract/:id", (req, res) =>
  contractController.updateContract(req, res)
);
router.delete("/contract/:id", (req, res) =>
  contractController.deleteContract(req, res)
);

export default router;
