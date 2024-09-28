import { Request, Response } from "express";
import { JobService } from "../services/jobService";

export class JobController {
  private jobService: JobService;

  constructor() {
    this.jobService = new JobService();
  }

  public async createJob(req: Request, res: Response): Promise<Response> {
    try {
      const { contractId, description, dueDate, price, paid } = req.body;
      const newJob = await this.jobService.createJob(
        contractId,
        description,
        dueDate,
        price,
        paid
      );
      return res.status(201).json(newJob);
    } catch (error) {
      return res.status(500).json({ message: "Failed to create job", error });
    }
  }

  public async getAllJobs(req: Request, res: Response): Promise<Response> {
    try {
      const jobs = await this.jobService.getAllJobs();
      return res.status(200).json(jobs);
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch jobs", error });
    }
  }

  public async getJobById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const job = await this.jobService.getJobById(Number(id));
      if (job) {
        return res.status(200).json(job);
      } else {
        return res.status(404).json({ message: "Job not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch job", error });
    }
  }

  public async updateJob(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { contractId, description, dueDate, price, paid } = req.body;

      // Crie um objeto com os dados para atualização
      const updatedJob = await this.jobService.updateJob(
        Number(id),
        contractId,
        description,
        dueDate,
        price
      );

      if (updatedJob) {
        return res.status(200).json(updatedJob);
      } else {
        return res.status(404).json({ message: "Job not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Failed to update job", error });
    }
  }

  public async deleteJob(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const deleted = await this.jobService.deleteJob(Number(id));
      if (deleted) {
        return res.status(204).send();
      } else {
        return res.status(404).json({ message: "Job not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Failed to delete job", error });
    }
  }
}
