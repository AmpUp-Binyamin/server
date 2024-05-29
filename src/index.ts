import 'dotenv/config'
import cors from 'cors'
import express from 'express';
import { connect } from './config/db'
connect()

const app = express()
app.use(cors())
app.use(express.json())

// middleware - token to user
import { verifyToken } from './middleware/auth'
app.use('*', verifyToken)

import UserRouter from './routes/UserRouter'
import CoachRouter from './routes/CoachRouter'
app.use('/user', UserRouter)
app.use('/coach', CoachRouter)

import FeedBackRouter from './routes/FeedBackRouter'
app.use('/feedback', FeedBackRouter)

import LuckRouter from './routes/LuckRouter'
app.use('/luck', LuckRouter)
app.listen(3030, () => console.log("Server is UP : 3030"))