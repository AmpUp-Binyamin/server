import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { connect } from './config/db';
import ActiveChallengeRouter from './routes/ActiveChallengeRouter';
import ArchiveRouter from './routes/ArchiveRouter';
import ChallengeRouter from './routes/ChallengeRouter';
import CoachRouter from './routes/CoachRouter';
import FeedBackRouter from './routes/FeedBackRouter';
import LuckRouter from './routes/LuckRouter';
import MediaRouter from './routes/MediaRouter';
import MemberRouter from './routes/MemberRouter';
import NotificationRoutr from './routes/NotificationRouter';
import StoreRouter from './routes/StoreRouter';
import UserRouter from './routes/UserRouter';

connect()

const app = express()
app.use(cors())
app.use(express.json())

// ###### ONLY FOR FAKE DATA
// import go from './mockData/aviad';
// go()
// ##########################

// middleware - token to user
import { verifyToken } from './middleware/auth';
app.use('*', verifyToken)


app.use('/user', UserRouter)
app.use('/coach', CoachRouter)
app.use('/activeChallenge', ActiveChallengeRouter)
app.use('/store', StoreRouter)
app.use('/archive', ArchiveRouter)
app.use('/media', MediaRouter)
app.use('/notification', NotificationRoutr)
app.use('/feedback', FeedBackRouter)
app.use('/challenge', ChallengeRouter)
app.use('/luck', LuckRouter)
app.use('/member', MemberRouter)

import CoinsRouter from './routes/CoinsRouter'
app.use('/coins', CoinsRouter)

import tokenTemporary from './test/tokenTemporary';
tokenTemporary.tokenHamudi().then(res=>console.log('token: \n \n',res,'\n'))

app.listen(3030, () => console.log("Server is UP : 3030"))