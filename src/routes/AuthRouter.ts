import { ObjectId } from 'mongoose'
import AuthService from '../services/AuthService'
import { Request, Response, Router } from 'express'
import IMember from '../interfaces/IMember'
const router = Router()

router.all('/checkEmail', async (req: Request, res: Response) => {
    try {
     let mamber=   await AuthService.checkEmail(req.body)
     if (mamber) 
        res.send(await AuthService.getMyInvitesAndMyActiveChallenge(req.body.email))
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})
export default router