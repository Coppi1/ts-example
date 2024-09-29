import { Router } from "express";
import { JobController } from "../controllers/jobController";

const router = Router();
const jobController = new JobController();

router.post("/job", (req, res) => jobController.createJob(req, res));
router.get("/jobs", (req, res) => jobController.getAllJobs(req, res));
router.get("/job/:id", (req, res) => jobController.getJobById(req, res));
router.put("/job/:id", (req, res) => jobController.updateJob(req, res));
router.delete("/job/:id", (req, res) => jobController.deleteJob(req, res));
router.get("/jobs/unpaid-total", (req, res) =>
  jobController.getUnpaidJobsTotal(req, res)
);




export default router;
