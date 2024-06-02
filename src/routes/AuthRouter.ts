import { ObjectId } from 'mongoose'
import AuthService from '../services/AuthService'
import { Request, Response, Router } from 'express'
const router = Router()

router.all('/checkEmail', async (req: Request, res: Response) => {
    try {
        let member = (await AuthService.checkEmail(req.body.email))
        let myChallenge = member.myChallenge
        let myActivChallenge: any = []
        await Promise.all(myChallenge.map(async challengeId => {
            let memberActivChaleng = await AuthService.checkActivChaleng(challengeId as ObjectId)
            if (memberActivChaleng.length > 0) {
                myActivChallenge.push({ memberActivChaleng })
            }
        }))
        res.send(myActivChallenge)
    }
    catch (error) {
        res.status(400).send(error)
    }
})
export default router