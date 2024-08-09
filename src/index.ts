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
import UserRouter from "./routes/old/UserRouter";
import NotificationRoutr from "./routes/old/NotificationRouter";
import FeedBackRouter from "./routes/old/FeedBackRouter";
import ActiveChallengeRouter from "./routes/old/ActiveChallengeRouter";
import ArchiveRouter from "./routes/old/ArchiveRouter";
import ChallengeRouter from "./routes/old/ChallengeRouter";
import LuckRouter from "./routes/old/LuckRouter";
import MediaRouter from "./routes/old/MediaRouter";
import MemberRouter from "./routes/old/MemberRouter";
import StoreRouter from "./routes/old/StoreRouter";
import CoinsRouter from "./routes/old/CoinsRouter";
import RegisterRouter from "./routes/old/RegisterRouter";
import TeamRouter from "./routes/old/TeamRouter";
import ChallengeModel from "./coach/router/challengeRouter";

app.use("/user", UserRouter);
app.use("/activeChallenge", ActiveChallengeRouter);
app.use("/store", StoreRouter);
app.use("/archive", ArchiveRouter);
app.use("/media", MediaRouter);
app.use("/notification", NotificationRoutr);
app.use("/feedback", FeedBackRouter);
app.use("/challenge", ChallengeRouter);
app.use("/luck", LuckRouter);
app.use("/member", MemberRouter);
app.use("/coins", CoinsRouter);
app.use("/register", RegisterRouter);
app.use("/team", TeamRouter);
app.use("/coach/challenge", ChallengeModel);
// ################################################
// ################################################

import tokenTemporary from "./test/tokenTemporary";
// tokenTemporary.tokenHamudi().then(res => console.log('token: \n \n', res, '\n'))

import "./test/scripts";

app.listen(3030, () => console.log("Server is UP : 3030"));
