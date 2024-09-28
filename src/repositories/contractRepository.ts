import { Optional } from "sequelize";
import Contract from "../models/Contract";

// Definir atributos do modelo
interface ContractAttributes {
  id: number;
  clientId: number;
  contractorId: number;
  terms: string;
  status: string;
  operationDatetime: Date;
  startDate: Date;
  expirationDate: Date;
}

// Definir atributos para criação (excluir o id se ele é gerado automaticamente)
interface ContractCreationAttributes
  extends Optional<ContractAttributes, "id"> {}

export class ContractRepository {
  public async create(data: ContractCreationAttributes): Promise<Contract> {
    try {
      const contract = await Contract.create(data);
      return contract;
    } catch (error) {
      throw new Error(`Unable to create contract: ${(error as Error).message}`);
    }
  }

  public async findAll(): Promise<Contract[]> {
    try {
      return await Contract.findAll();
    } catch (error) {
      throw new Error(`Unable to fetch contracts: ${(error as Error).message}`);
    }
  }

  public async findById(id: number): Promise<Contract | null> {
    try {
      return await Contract.findByPk(id);
    } catch (error) {
      throw new Error(
        `Unable to find contract with ID ${id}: ${(error as Error).message}`
      );
    }
  }
}
