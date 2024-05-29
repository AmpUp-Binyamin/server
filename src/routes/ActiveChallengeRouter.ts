import { Request, Response, Router } from 'express'
import { Mapper } from '../helpers/Mapper'
import ActiveChallegeService from '../services/ActiveChallengeService'
import AddActiveChallengeRequest from '../dto/activeChallenge/AddActiveChallengeRequest'
import AddUserRequest from '../dto/user/AddUserRequest'
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

        let luck = await ActiveChallegeService.loveCard(req.params.challengeId)
        res.send(luck)

    } catch (error) {
        res.status(400).send(error)
    }
})

// תשובה על קלף ספציפי
router.post('/:challengeId/card/:cardId', async (req: Request, res: Response) => {
    try {
        let challengeId = req.params.challengeId;
        let cardId = req.params.cardId;
        let answer = Mapper<AddUserRequest>(new AddUserRequest(), req.body)
        await ActiveChallegeService.handleCardAnswer(challengeId, cardId, answer);
        res.send('sucsses');
    }
    catch (error) {
        console.log(error);
    }
})

export default router;