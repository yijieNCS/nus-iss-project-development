import express from "express"
import {
    getAllResumes,
    getAllResumeById,
    createResume,
    deleteResumeById,
    updateResumeById
} from "./resumeController.controller.js";

const resumeRouter = express.Router()

resumeRouter.get('/api/resumes', getAllResumes)

resumeRouter.get('/api/resume/:id', getAllResumeById)

resumeRouter.post('/api/resume', createResume)

resumeRouter.delete('/api/resume/:id', deleteResumeById)

resumeRouter.put('/api/resume', updateResumeById)

export default resumeRouter