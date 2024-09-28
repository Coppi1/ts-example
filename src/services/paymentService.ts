import Payment from "../models/Payment";

export class PaymentService {
  public async createPayment(
    jobId: number,
    operationDateTime: Date,
    paymentValue: number
  ): Promise<Payment> {
    try {
      const payment = await Payment.create({
        jobId,
        operationDateTime,
        paymentValue,
      });
      return payment;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Unable to create payment: ${error.message}`);
      } else {
        throw new Error("An unknown error occurred.");
      }
    }
  }

  public async getAllPayments(): Promise<Payment[]> {
    try {
      return await Payment.findAll();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Unable to fetch payments: ${error.message}`);
      } else {
        throw new Error("An unknown error occurred.");
      }
    }
  }

  public async getPaymentById(id: number): Promise<Payment | null> {
    try {
      return await Payment.findByPk(id);
    } catch (error) {
      throw new Error(`Unable to fetch payment`);
    }
  }

  public async updatePayment(
    id: number,
    jobId: number,
    operationDateTime: Date,
    paymentValue: number
  ): Promise<Payment | null> {
    try {
      const payment = await Payment.findByPk(id);
      if (payment) {
        payment.operationDateTime = operationDateTime;
        payment.paymentValue = paymentValue;
        payment.jobId = jobId;
        await payment.save();
        return payment;
      }
      return null;
    } catch (error) {
      throw new Error(`Unable to update payment`);
    }
  }

  public async deletePayment(id: number): Promise<boolean> {
    try {
      const payment = await Payment.findByPk(id);
      if (payment) {
        await payment.destroy();
        return true;
      }
      return false;
    } catch (error) {
      throw new Error(`Unable to delete payment`);
    }
  }
}
