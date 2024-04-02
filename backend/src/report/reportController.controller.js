import {
    getReportsModel,
    getReportModel,
    createReportModel,
    deleteReportModel,
    updateReportModel
} from "./reportModel.model.js";
import { Report } from "./reportEntity.entity.js";

export async function getAllReports(req, res) {
    try {
        const reportsData = await getReportsModel()
        const reports = reportsData.map(row => new Report(
            row.reportId,
            row.report,
            row.reportedUser,
            row.reportBy,
        ))
        res.send(reports)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
}

export async function getAllReportById(req, res) {
    try {
        const id = req.params.id
        const report = await getReportModel(id)
        res.send(report)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
}

export async function createReport(req, res) {
    try {
        const {report, reportedUser, reportBy} = req.body
        const reportId = await createReportModel(
            report,
            reportedUser,
            reportBy     
        )
        res.status(200).send(`Report Id: ${reportId} is created Successfully`)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
}

export async function deleteReportById(req, res) {
    try {
        const id = req.params.id
        const reportId = await deleteReportModel(id)
        res.status(200).send(`Report Id: ${reportId} is deleted Successfully`)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
}

export async function updateReportById(req, res) {
    try {
        const { reportId, report, reportedUser, reportBy } = req.body
        const reportIdRes = await updateReportModel(
            reportId,
            report,
            reportedUser,
            reportBy   
        )
        res.status(200).send(`Report Id: ${reportIdRes} is updated Successfully`)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
}