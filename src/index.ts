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
import go from './mockData/seed';

// go()

// middleware - token to user
import { verifyToken } from './middleware/auth'
app.use('*', verifyToken)

import UserRouter from './routes/UserRouter'
import CoachRouter from './routes/CoachRouter'
import ActiveChallengeRouter from './routes/ActiveChallengeRouter'
import StoreRouter from './routes/StoreRouter'
app.use('/user', UserRouter)
app.use('/coach', CoachRouter)
app.use('/activeChallenge', ActiveChallengeRouter)
app.use('/store' , StoreRouter) 

import MediaRouter from './routes/MediaRouter'
app.use('/media', MediaRouter)

import FeedBackRouter from './routes/FeedBackRouter'
app.use('/feedback', FeedBackRouter)

app.listen(3030, () => console.log("Server is UP : 3030"))