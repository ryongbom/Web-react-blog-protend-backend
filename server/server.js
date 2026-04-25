const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://localhost:27017/blog')
    .then(() => {
        console.log('Successfully connected to mongodb!')
    })
    .catch((err) => {
        console.log('Mongodb error:', err)
    })

const PORT = 5000

app.get('/api/test', (req, res) => {
    res.json({ message: 'server connection success' })
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})