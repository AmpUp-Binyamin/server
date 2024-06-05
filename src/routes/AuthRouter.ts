import { ObjectId } from 'mongodb'
import AuthService from '../services/AuthService'
import { Request, Response, Router } from 'express'
const router = Router()

router.all('/checkEmail', async (req: Request, res: Response) => {
    try {
        let myActivChallenge = (await AuthService.checkEmail(req.body))
        res.send(myActivChallenge)
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})
export default router