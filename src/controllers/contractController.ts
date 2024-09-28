import { Request, Response } from "express";
import { ContractService } from "../services/contractService";

export class ContractController {
  private contractService: ContractService;

  constructor() {
    this.contractService = new ContractService();
  }

  public async createContract(req: Request, res: Response): Promise<Response> {
    try {
      const {
        clientId,
        contractorId,
        terms,
        status,
        operationDatetime,
        startDate,
        expirationDate,
      } = req.body;
      const newContract = await this.contractService.createContract(
        clientId,
        contractorId,
        terms,
        status,
        operationDatetime,
        startDate,
        expirationDate
      );
      return res.status(201).json(newContract);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to create contract", error });
    }
  }

  public async getAllContracts(req: Request, res: Response): Promise<Response> {
    try {
      const contracts = await this.contractService.getAllContracts();
      return res.status(200).json(contracts);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to fetch contracts", error });
    }
  }

  public async getContractById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const contract = await this.contractService.getContractById(Number(id));
      if (contract) {
        return res.status(200).json(contract);
      } else {
        return res.status(404).json({ message: "Contract not found" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to fetch contract", error });
    }
  }

  public async updateContract(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { terms, status, operationDatetime, startDate, expirationDate } =
        req.body;
      const updatedContract = await this.contractService.updateContract(
        Number(id),
        terms,
        status,
        operationDatetime,
        startDate,
        expirationDate
      );
      if (updatedContract) {
        return res.status(200).json(updatedContract);
      } else {
        return res.status(404).json({ message: "Contract not found" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to update contract", error });
    }
  }

  public async deleteContract(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const deleted = await this.contractService.deleteContract(Number(id));
      if (deleted) {
        return res.status(204).send();
      } else {
        return res.status(404).json({ message: "Contract not found" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to delete contract", error });
    }
  }
}
