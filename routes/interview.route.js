import express from "express";
const router = express.Router();
import {
  createInterview,
  getUserInterviews,
  cancelInterview,
} from "../controllers/interview.controller.js";

router.post("/", createInterview);

router.get("/user/:userId", getUserInterviews);

router.put("/cancel/:id", cancelInterview);

export default router;  
