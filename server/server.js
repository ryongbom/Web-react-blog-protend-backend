const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const User = require('./models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors())

const JWT_SECRET = 'your-secret-key'

mongoose.connect('mongodb://localhost:27017/blog')
    .then(() => {
        console.log('Successfully connected to mongodb!')
    })
    .catch((err) => {
        console.log('Mongodb error:', err)
    })

app.post('/api/auth/register', async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email })
        if (existingUser) res.status(400).json({ error: 'user existing' })

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })

        await newUser.save()
        res.json({ message: 'Successfully registered', user: { username: newUser.username, email: newUser.email } })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.post('/api/auth/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).json({ error: 'Not found user' })

    const isValid = await bcrypt.compare(req.body.password, user.password)
    if (!isValid) return res.status(400).json({ error: 'password is not correct' })

    const token = jwt.sign(
        { userId: user._id, username: user.username },
        JWT_SECRET,
        { expiresIn: '7h' }
    )

    res.json({ token, username: user.username })
})

const PORT = 5000

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})