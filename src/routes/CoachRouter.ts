import { Request, Response, Router } from "express";
import CoachService from "../services/CoachService";
import { Mapper } from "../helpers/Mapper";
import { CreateCoachRequest } from "../dto/coach/CoachRequest";

const router = Router()


router.get('/:userId', async (req: Request, res: Response) => {
    try {
        let coach = await CoachService.getSingleCoach(req.params.userId)
        res.send(coach)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/', async (req: Request, res: Response) => {
    try {
        let request = Mapper<CreateCoachRequest>(new CreateCoachRequest(), req.body)
        let coach = await CoachService.createNewCoach(request)
        res.send(coach)
    } catch (error) {
        res.status(400).send(error)
    }
})

export default router;