import Contratante from "../models/contratante-model";

export class ContratanteService {
  public async createContratante(nomeCompleto: string): Promise<Contratante> {
    try {
      const contratante = await Contratante.create({ nomeCompleto });
      return contratante;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Unable to create contratante: ${error.message}`);
      } else {
        throw new Error("An unknown error occurred.");
      }
    }
  }

  public async getAllContratantes(): Promise<Contratante[]> {
    try {
      return await Contratante.findAll();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Unable to fetch contratantes  ${error.message}`);
      } else {
        throw new Error("An unknown error occurred.");
      }
    }
  }

  public async getContratanteById(id: number): Promise<Contratante | null> {
    try {
      return await Contratante.findByPk(id);
    } catch (error) {
      throw new Error(`Unable to fetch contratante`);
    }
  }

  public async updateContratante(
    id: number,
    nomeCompleto: string
  ): Promise<Contratante | null> {
    try {
      const contratante = await Contratante.findByPk(id);
      if (contratante) {
        contratante.nomeCompleto = nomeCompleto;
        await contratante.save();
        return contratante;
      }
      return null;
    } catch (error) {
      throw new Error(`Unable to update contratante`);
    }
  }

  public async deleteContratante(id: number): Promise<boolean> {
    try {
      const contratante = await Contratante.findByPk(id);
      if (contratante) {
        await contratante.destroy();
        return true;
      }
      return false;
    } catch (error) {
      throw new Error(`Unable to delete contratante`);
    }
  }
}
