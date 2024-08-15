// src\index.ts
import cors from "cors";
import "dotenv/config";
import express from "express";
import { connect } from "./config/db";
//todo: use https

connect();

const app = express();
app.use(cors());
app.use(express.json());

// ###### ONLY FOR FAKE DATA
// import seed from './mockData/newDBSeeder';
// seed()

// import AuthRouter from "./routes/old/AuthRouter";
// app.use("/auth", AuthRouter);

// import CoachRouter from "./routes/old/CoachRouter";
// app.use("/coach", CoachRouter);

// middleware - token to user
import { verifyToken } from "./middleware/auth";
app.use("*", verifyToken);

// ################################################
// ################# ROUTERS ######################
// ################################################
// import ChallengeModel from "./coach/router/challengeRouter";
// import ActiveChallengeRouter from "./routes/old/ActiveChallengeRouter";
// import ArchiveRouter from "./routes/old/ArchiveRouter";
// import MemberRouter from "./routes/old/MemberRouter";
// import CoinsRouter from "./routes/old/CoinsRouter";

// import NotificationRouter from "./routes/old/NotificationRouter";
// import MediaRouter from "./routes/old/MediaRouter";
// import RegisterRouter from "./routes/old/RegisterRouter";
// import LuckRouter from "./routes/old/LuckRouter";

import answerRouter from './routes/AnswerRouter';
import cardRouter from './routes/CardRouter';
import ChallengeRouter from "./routes/ChallengeRouter";
import deckRouter from './routes/DeckRouter';
// import FeedBackRouter from "./routes/FeedBackRouter";
import prizeRouter from './routes/PrizeRouter';
import StoreRouter from "./routes/StoreRouter";
import teamRouter from "./routes/TeamRouter";
import userRouter from "./routes/UserRouter";


app.use('/answer', answerRouter);
app.use('/card', cardRouter);
app.use("/challenge", ChallengeRouter);
app.use('/deck', deckRouter);
// app.use("/feedback", FeedBackRouter);
app.use("/prize", prizeRouter);
app.use("/store", StoreRouter);
app.use("/team", teamRouter);
app.use("/user", userRouter);

// app.use("/media", MediaRouter);
// app.use("/notification", NotificationRouter);
// app.use("/luck", LuckRouter);
// app.use("/register", RegisterRouter);

// app.use("/coach/challenge", ChallengeModel);
// app.use("/coins", CoinsRouter);
// app.use("/archive", ArchiveRouter);
// app.use("/activeChallenge", ActiveChallengeRouter);
// app.use("/member", MemberRouter);

// ################################################
// ################################################

import tokenTemporary from "./test/temporaryToken";
tokenTemporary.coachToken().then(res => console.log('test coach token: \n \n',res, '\n'))

// import "./test/scripts";

app.listen(3030, () => console.log("Server is UP : 3030"));
