import express from 'express'
import router from './sessions/session-routes.js'

const app = express()

const middleware = (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send("Something broke!")
}

app.use(middleware)
app.use(express.json())
app.use(router)

app.listen(8080, () => {
    console.log('Server is running on port 8080...')
})