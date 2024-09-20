import { Optional } from "sequelize";
import Contratante from "../models/contratante-model";
// Definir atributos do modelo
interface ContratanteAttributes {
  id: number;
  nomeCompleto: string;
}

// Definir atributos para criação (excluir o id se ele é gerado automaticamente)
interface ContratanteCreationAttributes
  extends Optional<ContratanteAttributes, "id"> {}

export class ContratanteRepository {
  public async create(
    data: ContratanteCreationAttributes
  ): Promise<Contratante> {
    try {
      const contratante = await Contratante.create(data);
      return contratante;
    } catch (error) {
      throw new Error(
        `Unable to create contratante: ${(error as Error).message}`
      );
    }
  }

  public async findAll(): Promise<Contratante[]> {
    try {
      return await Contratante.findAll();
    } catch (error) {
      throw new Error(
        `Unable to fetch contratantes: ${(error as Error).message}`
      );
    }
  }

  public async findById(id: number): Promise<Contratante | null> {
    try {
      return await Contratante.findByPk(id);
    } catch (error) {
      throw new Error(
        `Unable to find contratante with ID ${id}: ${(error as Error).message}`
      );
    }
  }
}
