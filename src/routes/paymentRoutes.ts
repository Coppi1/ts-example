import { Router } from "express";
import { PaymentController } from "../controllers/paymentController.js";

const router = Router();
const paymentController = new PaymentController();

router.post("/payment", (req, res) =>
  paymentController.createPayment(req, res)
);
router.get("/payments", (req, res) =>
  paymentController.getAllPayments(req, res)
);
router.get("/payment/:id", (req, res) =>
  paymentController.getPaymentById(req, res)
);
router.put("/payment/:id", (req, res) =>
  paymentController.updatePayment(req, res)
);
router.delete("/payment/:id", (req, res) =>
  paymentController.deletePayment(req, res)
);

export default router;
