import { Request, Response, Router } from 'express'
import { Mapper } from '../helpers/Mapper'
import ActiveChallegeService from '../services/ActiveChallengeService'
import AddActiveChallengeRequest from '../dto/activeChallenge/AddActiveChallengeRequest'
const router = Router()


router.get('/:activeChallengeId', async (req: Request, res: Response) => {
    try {
        let activeChallenge = await ActiveChallegeService.getSingleActiveChallenge(req.params.userId)
        res.send(activeChallenge)
    }
    catch (error) {
        res.status(400).send(error)
    }
})
router.post('/', async (req: Request, res: Response) => {
    try {
        let request = Mapper<AddActiveChallengeRequest>(new AddActiveChallengeRequest(), req.body)
        let activeChallenge = await ActiveChallegeService.createNewActiveChallenge(request)
        res.send(activeChallenge)
    }
    catch (error) {
        res.status(400).send(error)
    }
})


export default router;