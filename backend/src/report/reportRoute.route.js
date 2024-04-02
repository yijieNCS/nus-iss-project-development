import express from "express"
import {
    getAllReports,
    getAllReportById,
    createReport,
    deleteReportById,
    updateReportById
} from "./reportController.controller.js";

const reportRouter = express.Router()

reportRouter.get('/api/reports', getAllReports)

reportRouter.get('/api/report/:id', getAllReportById)

reportRouter.post('/api/report', createReport)

reportRouter.delete('/api/report/:id', deleteReportById)

reportRouter.put('/api/report', updateReportById)

export default reportRouter