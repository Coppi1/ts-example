import Contract from "../models/Contract";

export class ContractService {
  public async createContract(
    clientId: number,
    contractorId: number,
    terms: string,
    status: string,
    operationDatetime: Date,
    startDate: Date,
    expirationDate: Date
  ): Promise<Contract> {
    try {
      const contract = await Contract.create({
        clientId,
        contractorId,
        terms,
        status,
        operationDatetime,
        startDate,
        expirationDate,
      });
      return contract;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Unable to create contract: ${error.message}`);
      } else {
        throw new Error("An unknown error occurred.");
      }
    }
  }

  public async getAllContracts(): Promise<Contract[]> {
    try {
      return await Contract.findAll();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Unable to fetch contracts: ${error.message}`);
      } else {
        throw new Error("An unknown error occurred.");
      }
    }
  }

  public async getContractById(id: number): Promise<Contract | null> {
    try {
      return await Contract.findByPk(id);
    } catch (error) {
      throw new Error(`Unable to fetch contract`);
    }
  }

  public async updateContract(
    id: number,
    terms: string,
    status: string,
    operationDatetime: Date,
    startDate: Date,
    expirationDate: Date
  ): Promise<Contract | null> {
    try {
      const contract = await Contract.findByPk(id);
      if (contract) {
        contract.terms = terms;
        contract.status = status;
        contract.operationDatetime = operationDatetime;
        contract.startDate = startDate;
        contract.expirationDate = expirationDate;
        await contract.save();
        return contract;
      }
      return null;
    } catch (error) {
      throw new Error(`Unable to update contract`);
    }
  }

  public async deleteContract(id: number): Promise<boolean> {
    try {
      const contract = await Contract.findByPk(id);
      if (contract) {
        await contract.destroy();
        return true;
      }
      return false;
    } catch (error) {
      throw new Error(`Unable to delete contract`);
    }
  }
}
