import { Optional } from "sequelize";
import Contractor from "../models/Contractor";

// Definir atributos do modelo
interface ContractorAttributes {
  id: number;
  nome: string;
}

// Definir atributos para criação (excluir o id se ele é gerado automaticamente)
interface ContractorCreationAttributes
  extends Optional<ContractorAttributes, "id"> {}

export class ContractorRepository {
  public async create(data: ContractorCreationAttributes): Promise<Contractor> {
    try {
      const contractor = await Contractor.create(data);
      return contractor;
    } catch (error) {
      throw new Error(
        `Unable to create contractor: ${(error as Error).message}`
      );
    }
  }

  public async findAll(): Promise<Contractor[]> {
    try {
      return await Contractor.findAll();
    } catch (error) {
      throw new Error(
        `Unable to fetch contractors: ${(error as Error).message}`
      );
    }
  }

  public async findById(id: number): Promise<Contractor | null> {
    try {
      return await Contractor.findByPk(id);
    } catch (error) {
      throw new Error(
        `Unable to find contractor with ID ${id}: ${(error as Error).message}`
      );
    }
  }
}
