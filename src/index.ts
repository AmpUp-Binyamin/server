import 'dotenv/config'
import cors from 'cors'
import express from 'express';
import { connect } from './config/db'
connect()
import fs = require("fs")
if (!fs.existsSync('./files')) {
    fs.mkdirSync('./files')
    const code = fs.readFileSync('./files/code.txt', 'utf8')
}

const app = express()
app.use(cors())
app.use(express.json())

import UserRouter from './routes/UserRouter'
app.use('/user', UserRouter)

import MediaRouter from './routes/MediaRouter'
app.use('/media', MediaRouter)

app.listen(3030, () => console.log("Server is UP : 3030"))