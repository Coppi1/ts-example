import Job from "../models/Job";
import { JobRepository } from "../repositories/jobRepository";

export class JobService {
  private jobRepository: JobRepository;

  constructor() {
    this.jobRepository = new JobRepository();
  }

  public async createJob(
    contractId: number,
    description: string,
    dueDate: Date,
    price: number,
    paid: boolean
  ): Promise<Job> {
    try {
      const job = await Job.create({
        contractId,
        description,
        dueDate,
        price,
        paid,
      });
      return job;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Unable to create job: ${error.message}`);
      } else {
        throw new Error("An unknown error occurred.");
      }
    }
  }

  public async getAllJobs(): Promise<Job[]> {
    try {
      return await Job.findAll();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Unable to fetch jobs: ${error.message}`);
      } else {
        throw new Error("An unknown error occurred.");
      }
    }
  }

  public async getJobById(id: number): Promise<Job | null> {
    try {
      return await Job.findByPk(id);
    } catch (error) {
      throw new Error(`Unable to fetch job`);
    }
  }

  public async updateJob(
    id: number,
    description: string,
    dueDate: Date,
    price: number,
    paid: boolean
  ): Promise<Job | null> {
    try {
      const job = await Job.findByPk(id);
      if (job) {
        job.description = description;
        job.dueDate = dueDate;
        job.price = price;
        job.paid = paid;
        await job.save();
        return job;
      }
      return null;
    } catch (error) {
      throw new Error(`Unable to update job`);
    }
  }

  public async deleteJob(id: number): Promise<boolean> {
    try {
      const job = await Job.findByPk(id);
      if (job) {
        await job.destroy();
        return true;
      }
      return false;
    } catch (error) {
      throw new Error(`Unable to delete job`);
    }
  }
  public async getUnpaidJobsTotal(): Promise<number> {
    return await this.jobRepository.getUnpaidJobsTotal();
  }
}
