import Client from "../models/Client";
import Deposit from "../models/Deposit";
import sequelize from "../shared/connection";

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

  // public async makeDeposit(
  //   clientId: number,
  //   depositValue: number
  // ): Promise<void> {
  //   const transaction = await sequelize.transaction();

  //   try {
  //     if (depositValue <= 0) {
  //       throw new Error("Deposit value must be positive");
  //     }

  //     const client = await Client.findByPk(clientId, { transaction });

  //     console.log(client, "Cliente puxado by pk");

  //     if (!client) {
  //       throw new Error("Client not found");
  //     }

  //     await Deposit.create(
  //       {
  //         clientId,
  //         operation: new Date(),
  //         value: depositValue,
  //       },
  //       { transaction }
  //     );

  //     client.balance += depositValue;

  //     console.log(
  //       `Updating client balance from ${client.balance - depositValue} to ${
  //         client.balance
  //       }`
  //     );

  //     await client.save({ transaction });

  //     await transaction.commit();
  //   } catch (error) {
  //     await transaction.rollback();
  //     throw new Error(`Deposit failed: ${(error as Error).message}`);
  //   }
  // }

  public async makeDeposit(
    clientId: number,
    depositValue: number
  ): Promise<void> {
    const transaction = await sequelize.transaction();

    try {
      if (depositValue <= 0) {
        throw new Error("Deposit value must be positive");
      }

      const client = await Client.findByPk(clientId, { transaction });

      console.log(client?.dataValues, "Cliente puxado by pk");

      if (!client) {
        throw new Error("Client not found");
      }

      await Deposit.create(
        {
          clientId,
          operation: new Date(),
          value: depositValue,
        },
        { transaction }
      );

      const [result] = await sequelize.query(
        `UPDATE client 
         SET balance = balance + :depositValue 
         WHERE id = :clientId`,
        {
          replacements: { depositValue, clientId },
          transaction,
        }
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw new Error(`Deposit failed: ${(error as Error).message}`);
    }
  }
}
