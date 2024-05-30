import 'dotenv/config'
import cors from 'cors'
import express from 'express';
import { connect } from './config/db'
connect()

const app = express()
app.use(cors())
app.use(express.json())

// ###### ONLY FOR FAKE DATA
// import go from './mockData/aviad';
// go()
// ##########################

// middleware - token to user
import { verifyToken } from './middleware/auth'
app.use('*', verifyToken)

import UserRouter from './routes/UserRouter'
import CoachRouter from './routes/CoachRouter'
import NotificationRoutr from './routes/NotificationRouter'
import FeedBackRouter from './routes/FeedBackRouter'
import ActiveChallengeRouter from './routes/ActiveChallengeRouter'

import StoreRouter from './routes/StoreRouter'
app.use('/user', UserRouter)
app.use('/coach', CoachRouter)
app.use('/activeChallenge', ActiveChallengeRouter)
app.use('/store' , StoreRouter) 

import MediaRouter from './routes/MediaRouter'
app.use('/media', MediaRouter)
app.use('/notification',NotificationRoutr)
app.use('/feedback', FeedBackRouter)

import ChallengeRouter from './routes/ChallengeRouter'
app.use('/challenge', ChallengeRouter)

import LuckRouter from './routes/LuckRouter'
app.use('/luck', LuckRouter)

import MemberRouter from './routes/MemberRouter'
app.use('/member', MemberRouter)

import CoinsRouter from './routes/CoinsRouter'
app.use('/coins', CoinsRouter)

app.listen(3030, () => console.log("Server is UP : 3030"))