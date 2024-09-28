import { Op, Optional } from "sequelize";
import Job from "../models/Job";
import Payment from "../models/Payment";
import sequelize from "../shared/connection"; // Certifique-se de que o caminho está correto

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
      // Encontre todos os jobs pagos e calcule a soma dos pagamentos relacionados
      const jobs = await Job.findAll({
        where: { paid: true }, // Filtra jobs que estão pagos
        include: [
          {
            model: Payment,
            where: {
              paymentValue: {
                [Op.lt]: sequelize.col("Job.price"), // Comparar com o preço do Job
              },
            },
            required: false,
          },
        ],
      });

      // Calcule o total dos pagamentos não pagos
      const total = jobs.reduce((acc: number, job: Job) => {
        // Corrigindo o acesso aos pagamentos
        const jobPayments = job.Payments || []; // Use o correto tipo Job
        const unpaidPayments = jobPayments.filter(
          (payment) => payment.paymentValue < job.price // Não precisa do tipo Payment aqui
        );

        return (
          acc +
          unpaidPayments.reduce((sum, payment) => sum + payment.paymentValue, 0) // Não precisa do tipo Payment aqui
        );
      }, 0);

      return total;
    } catch (error) {
      throw new Error(
        `Unable to fetch unpaid jobs total: ${(error as Error).message}`
      );
    }
  }
}
