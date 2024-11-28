import { Request, Response } from "express";
import { ContractorService } from "../services/contractorService.js";

export class ContractorController {
  private contractorService: ContractorService;

  constructor() {
    this.contractorService = new ContractorService();
  }

  public async createContractor(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { nome } = req.body;
      const newContractor = await this.contractorService.createContractor(nome);
      return res.status(201).json(newContractor);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to create contractor", error });
    }
  }

  public async getAllContractors(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const contractors = await this.contractorService.getAllContractors();
      return res.status(200).json(contractors);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to fetch contractors", error });
    }
  }

  public async getContractorById(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { id } = req.params;
      const contractor = await this.contractorService.getContractorById(
        Number(id)
      );
      if (contractor) {
        return res.status(200).json(contractor);
      } else {
        return res.status(404).json({ message: "Contractor not found" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to fetch contractor", error });
    }
  }

  public async updateContractor(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { id } = req.params;
      const { nome } = req.body;
      const updatedContractor = await this.contractorService.updateContractor(
        Number(id),
        nome
      );
      if (updatedContractor) {
        return res.status(200).json(updatedContractor);
      } else {
        return res.status(404).json({ message: "Contractor not found" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to update contractor", error });
    }
  }

  public async deleteContractor(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { id } = req.params;
      const deleted = await this.contractorService.deleteContractor(Number(id));
      if (deleted) {
        return res.status(204).send();
      } else {
        return res.status(404).json({ message: "Contractor not found" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to delete contractor", error });
    }
  }
}
