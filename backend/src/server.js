const express = require('express')
const cors = require('cors')
require('dotenv').config()

const testRoutes = require('./routes/testRoutes')
const userRoutes = require('./routes/userRoutes')
const { testConnection } = require('./config/db')

const app = express()

app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
    console.log('Content-Type:', req.headers['content-type'])
    console.log('Request body:', req.body)
    next()
})

app.use('/api/test', testRoutes)
app.use('/api/users', userRoutes)

app.get('/', (req, res) => {
    res.json({
        message: 'Quiz battle API is running'
    })
})

const PORT = process.env.PORT || 5000

testConnection()
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})