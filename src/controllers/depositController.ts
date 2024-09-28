import { Request, Response } from "express";
import { DepositService } from "../services/depositService";

export class DepositController {
  private depositService: DepositService;

  constructor() {
    this.depositService = new DepositService();
  }

  public async createDeposit(req: Request, res: Response): Promise<Response> {
    try {
      const { clientId, operation, value } = req.body;
      const newDeposit = await this.depositService.createDeposit(
        clientId,
        operation,
        value
      );
      return res.status(201).json(newDeposit);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to create deposit", error });
    }
  }

  public async getAllDeposits(req: Request, res: Response): Promise<Response> {
    try {
      const deposits = await this.depositService.getAllDeposits();
      return res.status(200).json(deposits);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to fetch deposits", error });
    }
  }

  public async getDepositById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const deposit = await this.depositService.getDepositById(Number(id));
      if (deposit) {
        return res.status(200).json(deposit);
      } else {
        return res.status(404).json({ message: "Deposit not found" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to fetch deposit", error });
    }
  }

  public async updateDeposit(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { clientId, operation, value } = req.body;
      const updatedDeposit = await this.depositService.updateDeposit(
        Number(id),
        clientId,
        operation,
        value
      );
      if (updatedDeposit) {
        return res.status(200).json(updatedDeposit);
      } else {
        return res.status(404).json({ message: "Deposit not found" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to update deposit", error });
    }
  }

  public async deleteDeposit(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const deleted = await this.depositService.deleteDeposit(Number(id));
      if (deleted) {
        return res.status(204).send();
      } else {
        return res.status(404).json({ message: "Deposit not found" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to delete deposit", error });
    }
  }
}
