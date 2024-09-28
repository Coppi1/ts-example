import Deposit from "../models/Deposit";

export class DepositService {
  public async createDeposit(
    clientId: number,
    operation: Date,
    value: number
  ): Promise<Deposit> {
    try {
      const deposit = await Deposit.create({ clientId, operation, value });
      return deposit;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Unable to create deposit: ${error.message}`);
      } else {
        throw new Error("An unknown error occurred.");
      }
    }
  }

  public async getAllDeposits(): Promise<Deposit[]> {
    try {
      return await Deposit.findAll();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Unable to fetch deposits: ${error.message}`);
      } else {
        throw new Error("An unknown error occurred.");
      }
    }
  }

  public async getDepositById(id: number): Promise<Deposit | null> {
    try {
      return await Deposit.findByPk(id);
    } catch (error) {
      throw new Error(`Unable to fetch deposit`);
    }
  }

  public async updateDeposit(
    id: number,
    clientId: number,
    operation: Date,
    value: number
  ): Promise<Deposit | null> {
    try {
      const deposit = await Deposit.findByPk(id);
      if (deposit) {
        deposit.clientId = clientId;
        deposit.operation = operation;
        deposit.value = value;
        await deposit.save();
        return deposit;
      }
      return null;
    } catch (error) {
      throw new Error(`Unable to update deposit`);
    }
  }

  public async deleteDeposit(id: number): Promise<boolean> {
    try {
      const deposit = await Deposit.findByPk(id);
      if (deposit) {
        await deposit.destroy();
        return true;
      }
      return false;
    } catch (error) {
      throw new Error(`Unable to delete deposit`);
    }
  }
}
