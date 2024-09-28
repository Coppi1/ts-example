import { Request, Response } from "express";
import { ClientService } from "../services/clientService";

export class ClientController {
  private clientService: ClientService;

  constructor() {
    this.clientService = new ClientService();
  }

  public async createClient(req: Request, res: Response): Promise<Response> {
    try {
      const { firstName, lastName, profession, type, balance } = req.body;
      const newClient = await this.clientService.createClient(
        firstName,
        lastName,
        profession,
        type,
        balance
      );
      return res.status(201).json(newClient);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to create client", error });
    }
  }

  public async getAllClients(req: Request, res: Response): Promise<Response> {
    try {
      const clients = await this.clientService.getAllClients();
      return res.status(200).json(clients);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to fetch clients", error });
    }
  }

  public async getClientById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const client = await this.clientService.getClientById(Number(id));
      if (client) {
        return res.status(200).json(client);
      } else {
        return res.status(404).json({ message: "Client not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch client", error });
    }
  }

  public async updateClient(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { firstName, lastName, profession, type, balance } = req.body;
      const updatedClient = await this.clientService.updateClient(
        Number(id),
        firstName,
        lastName,
        profession,
        type,
        balance
      );
      if (updatedClient) {
        return res.status(200).json(updatedClient);
      } else {
        return res.status(404).json({ message: "Client not found" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to update client", error });
    }
  }

  public async deleteClient(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const deleted = await this.clientService.deleteClient(Number(id));
      if (deleted) {
        return res.status(204).send();
      } else {
        return res.status(404).json({ message: "Client not found" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to delete client", error });
    }
  }
}
