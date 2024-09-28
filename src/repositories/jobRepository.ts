import { Optional } from "sequelize";
import Job from "../models/Job";

// Definir atributos do modelo
interface JobAttributes {
  id: number;
  contractId: number;
  description: string;
  dueDate: Date;
  price: number;
  paid: boolean;
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
}
