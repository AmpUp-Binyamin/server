import 'dotenv/config'
import cors from 'cors'
import express from 'express';
import { connect } from './config/db'
connect()

const app = express()
app.use(cors())
app.use(express.json())

import UserRouter from './routes/UserRouter'
app.use('/user', UserRouter)

app.listen(3030, () => console.log("Server is UP : 3030"))