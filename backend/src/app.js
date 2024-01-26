import express from 'express'

const app = express()

const middleware = (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send("Something broke!")
}

app.use(middleware)

app.listen(8080, () => {
    console.log('Server is running on port 8080...')
})