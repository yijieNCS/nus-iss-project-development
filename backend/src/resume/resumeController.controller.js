import {
    getResumesModel,
    getResumeModel,
    createResumeModel,
    deleteResumeModel,
    updateResumeModel
} from "./resumeModel.model.js";

export async function getAllResumes(req, res) {
    try {
        const resumes = await getResumesModel()
        res.send(resumes)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
}

export async function getAllResumeById(req, res) {
    try {
        const id = req.params.id
        const resume = await getResumeModel(id)
        res.send(resume)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
}

export async function createResume(req, res) {
    try {
        const { userId, years, name, types, description} = req.body
        const resumeId = await createResumeModel(
            userId, 
            years,
            name, 
            types, 
            description
        )
        res.status(200).send(`Resume Id: ${resumeId} is created Successfully`)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
}

export async function deleteResumeById(req, res) {
    try {
        const id = req.params.id
        const resumeId = await deleteResumeModel(id)
        res.status(200).send(`Resume Id: ${resumeId} is deleted Successfully`)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
}

export async function updateResumeById(req, res) {
    try {
        const { resumeId, userId, years, name, types, description } = req.body
        const resumeIdRes = await updateResumeModel(
            resumeId,
            userId, 
            years, 
            name, 
            types, 
            description
        )
        res.status(200).send(`Resume Id: ${resumeIdRes} is updated Successfully`)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
}