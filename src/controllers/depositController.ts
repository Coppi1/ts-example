import { Request, Response } from "express";
import { DepositService } from "../services/depositService.js";

export class DepositController {
  private depositService: DepositService;

  constructor() {
    this.depositService = new DepositService();
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

  public async makeDeposit(req: Request, res: Response): Promise<Response> {
    try {
      const { clientId, value } = req.body;

      // Chama o método makeDeposit do serviço
      await this.depositService.makeDeposit(clientId, value);

      // Retorna sucesso se a operação for concluída
      return res
        .status(201)
        .json({ message: "Deposit created and balance updated" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error processing deposit",
        error: (error as Error).message,
      });
    }
  }
}
