import {
    getServices,
    getService,
    createServiceModel,
    updateServiceModel,
    getSubject,
    getTopic,
    deleteServiceModel
} from "./service-model.js";


export async function getAllServices(req, res)
{
    try{
        const services = await getServices()
        res.send(services)
    }
    catch (error){
        console.error(error)
        res.status(500).json({error: error.message})
    }
}

export async function getServiceBySubject(req,res)
{
    try {
        console.log('Request params:', req.params)
        const subject = req.params.Subject
        const service = await getSubject(subject)
        res.send(service)
    } catch (error){
        console.error(error)
        res.status(500).json({error: error.message})
    }
}

export async function getServiceByTopic(req,res)
{
    try {
        const topic = req.params.Topic
        const service = await getTopic(topic)
        res.send(service)
    } catch (error){
        console.error(error)
        res.status(500).json({error: error.message})
    }
}

export async function getServiceById(req,res)
{
    try {
        const id = req.params.id
        const service = await getService(id)
        res.send(service)
    } catch (error){
        console.error(error)
        res.status(500).json({error: error.message})
    }
}

export async function createService(req, res)
{
    try{
        const {userId, subject, topic, experience, rate} = req.body
        const serviceId = await createServiceModel(userId, subject, topic, experience, rate)
        res.status(200).send(`Service Id: ${serviceId} is created Successfully`)
    }
    catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
}

export async function updateServiceById(req, res) {
    try {
        const {serviceId, userId, subject, topic, experience, rate} = req.body
        const serviceIdRes = await updateServiceModel(serviceId, userId, subject, topic, experience, rate)
        res.status(200).send(`Service Id: ${serviceIdRes} is updated Successfully`)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
}

export async function deleteServiceById(req, res) {
    try {
        const id = req.params.id
        const serviceId = await deleteServiceModel(id)
        res.status(200).send(`Service Id: ${serviceId} is deleted Successfully`)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
}