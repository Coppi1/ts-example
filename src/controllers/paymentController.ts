import { Request, Response } from "express";
import { PaymentService } from "../services/paymentService";

export class PaymentController {
  private paymentService: PaymentService;

  constructor() {
    this.paymentService = new PaymentService();
  }

  public async createPayment(req: Request, res: Response): Promise<Response> {
    try {
      const { jobId, operationDateTime, paymentValue } = req.body;
      const newPayment = await this.paymentService.createPayment(
        jobId,
        operationDateTime,
        paymentValue
      );
      return res.status(201).json(newPayment);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to create payment", error });
    }
  }

  public async getAllPayments(req: Request, res: Response): Promise<Response> {
    try {
      const payments = await this.paymentService.getAllPayments();
      return res.status(200).json(payments);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to fetch payments", error });
    }
  }

  public async getPaymentById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const payment = await this.paymentService.getPaymentById(Number(id));
      if (payment) {
        return res.status(200).json(payment);
      } else {
        return res.status(404).json({ message: "Payment not found" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to fetch payment", error });
    }
  }

  public async updatePayment(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { jobId, operationDateTime, paymentValue } = req.body;
      const updatedPayment = await this.paymentService.updatePayment(
        Number(id),
        jobId,
        operationDateTime,
        paymentValue
      );
      if (updatedPayment) {
        return res.status(200).json(updatedPayment);
      } else {
        return res.status(404).json({ message: "Payment not found" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to update payment", error });
    }
  }

  public async deletePayment(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const deleted = await this.paymentService.deletePayment(Number(id));
      if (deleted) {
        return res.status(204).send();
      } else {
        return res.status(404).json({ message: "Payment not found" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to delete payment", error });
    }
  }
}
