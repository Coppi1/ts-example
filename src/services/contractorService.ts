import Contractor from "../models/Contractor";

export class ContractorService {
  public async createContractor(nome: string): Promise<Contractor> {
    try {
      const contractor = await Contractor.create({ nome });
      return contractor;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Unable to create contractor: ${error.message}`);
      } else {
        throw new Error("An unknown error occurred.");
      }
    }
  }

  public async getAllContractors(): Promise<Contractor[]> {
    try {
      return await Contractor.findAll();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Unable to fetch contractors: ${error.message}`);
      } else {
        throw new Error("An unknown error occurred.");
      }
    }
  }

  public async getContractorById(id: number): Promise<Contractor | null> {
    try {
      return await Contractor.findByPk(id);
    } catch (error) {
      throw new Error(`Unable to fetch contractor`);
    }
  }

  public async updateContractor(
    id: number,
    nome: string
  ): Promise<Contractor | null> {
    try {
      const contractor = await Contractor.findByPk(id);
      if (contractor) {
        contractor.nome = nome;
        await contractor.save();
        return contractor;
      }
      return null;
    } catch (error) {
      throw new Error(`Unable to update contractor`);
    }
  }

  public async deleteContractor(id: number): Promise<boolean> {
    try {
      const contractor = await Contractor.findByPk(id);
      if (contractor) {
        await contractor.destroy();
        return true;
      }
      return false;
    } catch (error) {
      throw new Error(`Unable to delete contractor`);
    }
  }
}
