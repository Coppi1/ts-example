import { Router } from "express";
import { ContractController } from "../controllers/contractController.js";
import { JobController } from "../controllers/jobController.js"; // Importar o JobController

const router = Router();
const contractController = new ContractController();
const jobController = new JobController(); // Instanciar o JobController

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

// Nova rota para obter jobs por contractId
router.get("/contracts/:contractId/jobs", (req, res) => {
  // Chama o método do JobController passando req e res
  jobController.getJobsByContractId(req, res); 
});

export default router;
