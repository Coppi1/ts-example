import { Optional } from "sequelize";
import Payment from "../models/Payment";

// Definir atributos do modelo
interface PaymentAttributes {
  id: number;
  jobId: number;
  operationDateTime: Date;
  paymentValue: number;
}

// Definir atributos para criação (excluir o id se ele é gerado automaticamente)
interface PaymentCreationAttributes extends Optional<PaymentAttributes, "id"> {}

export class PaymentRepository {
  public async create(data: PaymentCreationAttributes): Promise<Payment> {
    try {
      const payment = await Payment.create(data);
      return payment;
    } catch (error) {
      throw new Error(`Unable to create payment: ${(error as Error).message}`);
    }
  }

  public async findAll(): Promise<Payment[]> {
    try {
      return await Payment.findAll();
    } catch (error) {
      throw new Error(`Unable to fetch payments: ${(error as Error).message}`);
    }
  }

  public async findById(id: number): Promise<Payment | null> {
    try {
      return await Payment.findByPk(id);
    } catch (error) {
      throw new Error(
        `Unable to find payment with ID ${id}: ${(error as Error).message}`
      );
    }
  }
}
