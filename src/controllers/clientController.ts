import { Request, Response } from "express";
import { connectRedis, client as redisClient } from "../config/redisClient";
import { ClientService } from "../services/clientService";

export class ClientController {
  private clientService: ClientService;

  constructor() {
    this.clientService = new ClientService();
  }

  public async createClient(req: Request, res: Response): Promise<Response> {
    try {
      const { firstName, lastName, profession, type, balance } = req.body;
      const clientKey = `client:${firstName}:${lastName}`; // Chave única para o cliente no cache

      await connectRedis();

      // Tenta recuperar os dados
      const cachedClient = await redisClient.get(clientKey);
      if (cachedClient) {
        return res.status(200).json(JSON.parse(cachedClient));
      }

      // Cria o cliente se não achar
      const newClient = await this.clientService.createClient(
        firstName,
        lastName,
        profession,
        type,
        balance
      );

      // Armazena o cliente no cache Redis
      await redisClient.set(clientKey, JSON.stringify(newClient), {
        EX: 3600, // tempo de expiração em segundos (1 hora)
      });

      return res.status(201).json(newClient);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to create client", error });
    }
  }

  public async getAllClients(req: Request, res: Response): Promise<Response> {
    try {
      const cacheKey = "clients";
      // Tenta recuperar os dados do Redis
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        return res.status(200).json(JSON.parse(cachedData)); // retorna cache
      }

      // Caso não tenha cache, faz a consulta ao banco de dados
      const clients = await this.clientService.getAllClients();

      // Armazena o resultado no cache, com um tempo de expiração de 60 segundos
      await redisClient.setEx(cacheKey, 60, JSON.stringify(clients));

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
  public async getClientBalance(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      // const balance = await this.clientService.getBalanceById(id);
      const balance = id;
      if (balance !== null) {
        res.status(200).json({ balance });
      } else {
        res.status(404).json({ message: "Client not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching balance" });
    }
  }
}
