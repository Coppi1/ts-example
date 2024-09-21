import { Request, Response } from "express";
import { ContratanteService } from "../services/contratante-service";

export class ContratanteController {
  private contratanteService: ContratanteService;

  constructor() {
    this.contratanteService = new ContratanteService();
  }

  public async createContratante(
    req: Request,
    res: Response
  ): Promise<Response> {
    console.log("Received request:", req.body);
    try {
      const { nomeCompleto } = req.body;
      const newContratante = await this.contratanteService.createContratante(
        nomeCompleto
      );
      return res.status(201).json(newContratante);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to create contratante", error });
    }
  }

  public async getAllContratantes(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const contratantes = await this.contratanteService.getAllContratantes();
      return res.status(200).json(contratantes);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to fetch contratantes", error });
    }
  }

  public async getContratanteById(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { id } = req.params;
      const contratante = await this.contratanteService.getContratanteById(
        Number(id)
      );
      if (contratante) {
        return res.status(200).json(contratante);
      } else {
        return res.status(404).json({ message: "Contratante not found" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to fetch contratante", error });
    }
  }

  public async updateContratante(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { id } = req.params;
      const { nomeCompleto } = req.body;
      const updatedContratante =
        await this.contratanteService.updateContratante(
          Number(id),
          nomeCompleto
        );
      if (updatedContratante) {
        return res.status(200).json(updatedContratante);
      } else {
        return res.status(404).json({ message: "Contratante not found" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to update contratante", error });
    }
  }

  public async deleteContratante(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { id } = req.params;
      const deleted = await this.contratanteService.deleteContratante(
        Number(id)
      );
      if (deleted) {
        return res.status(204).send();
      } else {
        return res.status(404).json({ message: "Contratante not found" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to delete contratante", error });
    }
  }
}
