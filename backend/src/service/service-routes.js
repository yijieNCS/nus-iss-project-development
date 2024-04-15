import express from "express"
import {
    getAllServices,
    getServiceById,
    createService,
    updateServiceById,
    deleteServiceById,
    getServiceBySubject,
    getServiceByTopic
} from "./service-controller.js";

const serviceRouter = express.Router()

serviceRouter.get('/api/services', getAllServices)

serviceRouter.get('/api/service/:id', getServiceById)

serviceRouter.get('/api/serviceSearchSubject/:Subject', getServiceBySubject)

serviceRouter.get('/api/serviceSearchTopic/:Topic', getServiceByTopic)

serviceRouter.post('/api/service', createService)

serviceRouter.put('/api/service/', updateServiceById)

serviceRouter.delete('/api/service/:id', deleteServiceById)

export default serviceRouter