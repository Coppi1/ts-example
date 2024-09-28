import Client from "../models/Client";

export class ClientService {
  public async createClient(
    firstName: string,
    lastName: string,
    profession: string,
    type: string,
    balance: number
  ): Promise<Client> {
    try {
      const client = await Client.create({
        firstName,
        lastName,
        profession,
        type,
        balance,
      });
      return client;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Unable to create client: ${error.message}`);
      } else {
        throw new Error("An unknown error occurred.");
      }
    }
  }

  public async getAllClients(): Promise<Client[]> {
    try {
      return await Client.findAll();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Unable to fetch clients: ${error.message}`);
      } else {
        throw new Error("An unknown error occurred.");
      }
    }
  }

  public async getClientById(id: number): Promise<Client | null> {
    try {
      return await Client.findByPk(id);
    } catch (error) {
      throw new Error(`Unable to fetch client`);
    }
  }

  public async updateClient(
    id: number,
    firstName: string,
    lastName: string,
    profession: string,
    type: string,
    balance: number
  ): Promise<Client | null> {
    try {
      const client = await Client.findByPk(id);
      if (client) {
        client.firstName = firstName;
        client.lastName = lastName;
        client.profession = profession;
        client.type = type;
        client.balance = balance;
        await client.save();
        return client;
      }
      return null;
    } catch (error) {
      throw new Error(`Unable to update client`);
    }
  }

  public async deleteClient(id: number): Promise<boolean> {
    try {
      const client = await Client.findByPk(id);
      if (client) {
        await client.destroy();
        return true;
      }
      return false;
    } catch (error) {
      throw new Error(`Unable to delete client`);
    }
  }

  public async getBalanceById(id: number): Promise<number | null> {
    try {
      const client = await Client.findByPk(id, {
        attributes: ["balance"],
      });
      if (client) {
        return client.balance;
      }
      return null;
    } catch (error) {
      throw new Error(`Unable to fetch balance for client with ID ${id}`);
    }
  }
}
