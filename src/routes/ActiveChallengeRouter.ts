import { Request, Response, Router } from 'express'
import { Mapper } from '../helpers/Mapper'
import ActiveChallegeService from '../services/ActiveChallengeService'
import AddActiveChallengeRequest from '../dto/activeChallenge/AddActiveChallengeRequest'
import { loveCard } from '../services/LoveCardService'
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
        let activeChallenge = await ActiveChallegeService.createNewActiveChallenge(req.body)
        console.log(activeChallenge);

        res.send(activeChallenge)
    }
    catch (error) {
        res.status(400).send(error)
    }
})

router.get('/cardLove/:challengeId', async (req: Request, res: Response) => {
    try {
   
        let luck = await loveCard.getLove(req.params.challengeId)
        res.send(luck)

    } catch (error) {
        res.status(400).send(error)
    }
})


export default router;