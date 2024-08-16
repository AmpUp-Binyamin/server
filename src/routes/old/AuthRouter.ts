// src\routes\old\AuthRouter.ts
import { ObjectId } from 'mongoose';
import AuthService from '../../services/old/AuthService';
import { Request, Response, Router } from 'express';
import { IUser } from '../../interfaces/IUser';
const router = Router();

router.post('/checkEmail', async (req: Request, res: Response) => {
  try {
    let user = await AuthService.checkEmail(req.body);
    let fullMember = await AuthService.getMyInvitesAndMyActiveChallenge(
      req.body.email,
    );
    res.send(fullMember);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});
export default router;
