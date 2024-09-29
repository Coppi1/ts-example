import { Optional, QueryTypes } from "sequelize";
import Job from "../models/Job";
import Payment from "../models/Payment";
import sequelize from "../shared/connection";

// Definir atributos do modelo
interface JobAttributes {
  id: number;
  contractId: number;
  description: string;
  dueDate: Date;
  price: number;
  paid: boolean;
  Payments?: Payment[];
}

// Definir atributos para criação (excluir o id se ele é gerado automaticamente)
interface JobCreationAttributes extends Optional<JobAttributes, "id"> {}

export class JobRepository {
  public async create(data: JobCreationAttributes): Promise<Job> {
    try {
      const job = await Job.create(data);
      return job;
    } catch (error) {
      throw new Error(`Unable to create job: ${(error as Error).message}`);
    }
  }

  public async findAll(): Promise<Job[]> {
    try {
      return await Job.findAll();
    } catch (error) {
      throw new Error(`Unable to fetch jobs: ${(error as Error).message}`);
    }
  }

  public async findById(id: number): Promise<Job | null> {
    try {
      return await Job.findByPk(id);
    } catch (error) {
      throw new Error(
        `Unable to find job with ID ${id}: ${(error as Error).message}`
      );
    }
  }

  public async getUnpaidJobsTotal(): Promise<number> {
    try {
      const [result] = await sequelize.query<{ total: number }>(
        `
        SELECT SUM(p.payment_value) AS total
        FROM payment p
        JOIN job j ON j.id = p.job_id
        WHERE p.payment_value < j.price AND j.paid = true
      `,
        { type: QueryTypes.SELECT }
      );

      return result?.total || 0;
    } catch (error) {
      throw new Error(
        `Unable to fetch unpaid jobs total: ${(error as Error).message}`
      );
    }
  }
}
