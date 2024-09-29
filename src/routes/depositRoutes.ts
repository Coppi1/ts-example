import { Router } from "express";
import { DepositController } from "../controllers/depositController";

const router = Router();
const depositController = new DepositController();

router.get("/deposits", (req, res) =>
  depositController.getAllDeposits(req, res)
);
router.get("/deposit/:id", (req, res) =>
  depositController.getDepositById(req, res)
);
router.put("/deposit/:id", (req, res) =>
  depositController.updateDeposit(req, res)
);
router.delete("/deposit/:id", (req, res) =>
  depositController.deleteDeposit(req, res)
);
router.post("/deposit", (req, res) => depositController.makeDeposit(req, res));

export default router;
