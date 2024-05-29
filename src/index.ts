import 'dotenv/config'
import cors from 'cors'
import express from 'express';
import { connect } from './config/db'
connect()

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
import NotificationRoutr from './routes/NotificationRouter'
import MediaRouter from './routes/MediaRouter'
import FeedBackRouter from './routes/FeedBackRouter'

app.use('/user', UserRouter)
app.use('/coach', CoachRouter)
app.use('/activeChallenge', ActiveChallengeRouter)
app.use('/media', MediaRouter)
app.use('/notification',NotificationRoutr)
app.use('/feedback', FeedBackRouter)

app.listen(3030, () => console.log("Server is UP : 3030"))