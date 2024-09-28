import { Optional } from "sequelize";
import Client from "../models/Client";

// Definir atributos do modelo
interface ClientAttributes {
  id: number;
  firstName: string;
  lastName: string;
  profession: string;
  type: string;
  balance: number;
}

// Definir atributos para criação (excluir o id se ele é gerado automaticamente)
interface ClientCreationAttributes extends Optional<ClientAttributes, "id"> {}

export class ClientRepository {
  public async create(data: ClientCreationAttributes): Promise<Client> {
    try {
      const client = await Client.create(data);
      return client;
    } catch (error) {
      throw new Error(`Unable to create client: ${(error as Error).message}`);
    }
  }

  public async findAll(): Promise<Client[]> {
    try {
      return await Client.findAll();
    } catch (error) {
      throw new Error(`Unable to fetch clients: ${(error as Error).message}`);
    }
  }

  public async findById(id: number): Promise<Client | null> {
    try {
      return await Client.findByPk(id);
    } catch (error) {
      throw new Error(
        `Unable to find client with ID ${id}: ${(error as Error).message}`
      );
    }
  }
}
