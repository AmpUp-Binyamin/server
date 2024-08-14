import cors from "cors";
import "dotenv/config";
import express from "express";
import { connect } from "./config/db";

connect();

const app = express();
app.use(cors());
app.use(express.json());

// ###### ONLY FOR FAKE DATA
// import go from './mockData/aviad';
// go()
import AuthRouter from "./routes/old/AuthRouter";
app.use("/auth", AuthRouter);

import CoachRouter from "./routes/old/CoachRouter";
app.use("/coach", CoachRouter);

// middleware - token to user
import { verifyToken } from "./middleware/auth";
app.use("*", verifyToken);

// ################################################
// ################# ROUTERS ######################
// ################################################
import NotificationRoutr from "./routes/old/NotificationRouter";
import ChallengeModel from "./coach/router/challengeRouter";
// import ActiveChallengeRouter from "./routes/old/ActiveChallengeRouter";
import ArchiveRouter from "./routes/old/ArchiveRouter";
import LuckRouter from "./routes/old/LuckRouter";
import MemberRouter from "./routes/old/MemberRouter";
import CoinsRouter from "./routes/old/CoinsRouter";
import RegisterRouter from "./routes/old/RegisterRouter";
import MediaRouter from "./routes/old/MediaRouter";

import answerRouter from './routes/AnswerRouter';
import cardRouter from './routes/CardRouter';
import ChallengeRouter from "./routes/ChallengeRouter";
import deckRouter from './routes/DeckRouter';
import FeedBackRouter from "./routes/FeedBackRouter";
import prizeRouter from './routes/PrizeRouter';
import StoreRouter from "./routes/StoreRouter";
import teamRouter from "./routes/TeamRouter";
import userRouter from "./routes/UserRouter";




app.use('/answer', answerRouter);
app.use('/card', cardRouter);
app.use("/challenge", ChallengeRouter);
app.use('/deck', deckRouter);
app.use("/feedback", FeedBackRouter);
app.use("/prize", prizeRouter);
app.use("/store", StoreRouter);
app.use("/team", teamRouter);
app.use("/user", userRouter);
// app.use("/activeChallenge", ActiveChallengeRouter);
// app.use("/archive", ArchiveRouter);
app.use("/media", MediaRouter);
app.use("/notification", NotificationRoutr);
app.use("/luck", LuckRouter);
app.use("/member", MemberRouter);
app.use("/coins", CoinsRouter);
app.use("/register", RegisterRouter);
app.use("/coach/challenge", ChallengeModel);
// ################################################
// ################################################

import tokenTemporary from "./test/tokenTemporary";
// tokenTemporary.tokenHamudi().then(res => console.log('token: \n \n', res, '\n'))

import "./test/scripts";

app.listen(3030, () => console.log("Server is UP : 3030"));
