import { Interview } from "../models/Interview.model.js";

export const createInterview = async (req, res) => {
  try {
    const interview = new Interview(req.body);
    await interview.save();
    res.status(201).json(interview);
  } catch (err) {
    res.status(500).json({
      message: "Failed to schedule interview",
      error: err.message,
    });
  }
};

export const getUserInterviews = async (req, res) => {
  try {
    const { userId } = req.params;

    const interviews = await Interview.find({
      $or: [
        { employerId: userId },    
        { applicantId: userId },    
      ],
    })
      .populate("jobId")
      .populate("employerId") 
      .populate("applicantId");

    res.status(200).json(interviews);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch interviews",
      error: err.message,
    });
  }
};

export const cancelInterview = async (req, res) => {
  try {
    const { id } = req.params;
    const interview = await Interview.findByIdAndUpdate(
      id,
      { status: "Cancelled" },
      { new: true }
    );

    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    res.status(200).json(interview);
  } catch (err) {
    res.status(500).json({
      message: "Failed to cancel interview",
      error: err.message,
    });
  }
};
