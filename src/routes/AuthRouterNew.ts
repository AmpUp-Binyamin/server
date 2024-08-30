// src\routes\AuthRouterNew.ts
import { ObjectId } from 'mongoose';
import AuthService from '../services/AuthServiceNew';
import { verifyToken } from '../middleware/auth';
import { Request, Response, Router } from 'express';
import { IUser } from '../interfaces/IUser';
import UserService from '../services/UserService';
const router = Router();

// router.post('/checkEmail', async (req: Request, res: Response) => {
//   try {
//     let user = await AuthService.checkEmail(req.body);
//     let fullMember = await AuthService.getMyInvitesAndMyActiveChallenge(
//       req.body.email,
//     );
//     res.send(fullMember);
//   } catch (error) {
//     console.log(error);
//     res.status(400).send(error);
//   }
// });

router.get('/coach', verifyToken, async (req: Request, res: Response) => {
  try {
    let coach = await UserService.getSingleUser(req.body.userId);
    console.log({coach});
    if (!coach) throw new Error("no coach");
    if (coach.status != 'Coach') throw new Error("not coach");
    
    res.send(coach);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;