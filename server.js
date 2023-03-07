const express = require('express')
const app = express()

const cookieparser = require('cookie-parser')
const db = require('./db/config')

const md = require('./middleware/auth')
const port = process.env.PORT || 5000
app.use(express.json())
app.use(cookieparser())

// urlencoded({ extended: true });
const routes = require("./routes/api/user")
const router = require("./routes/api/auth")
const route = require("./routes/api/activity")

app.use('/api/user', routes)
app.use('/api/auth', router)
app.use(md)

app.use('/api/activity', route)



app.listen(port, console.log(`the server is running on this ${port}`))