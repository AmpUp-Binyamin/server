import { Request, Response, Router } from 'express'
import { Mapper } from '../helpers/Mapper'
import ActiveChallegeService from '../services/ActiveChallengeService'
import AddActiveChallengeRequest from '../dto/activeChallenge/AddActiveChallengeRequest'
import { loveCard } from '../services/LoveCardService'
import IActiveChallenge from '../interfaces/IActiveChallenge'
import GetActiveChallToStartReq from '../dto/activeChallenge/GetActiveChallToStartReq'
import AddUserRequest from '../dto/user/AddUserRequest'
import GetStatusDoneCardsRes from '../dto/activeChallenge/GetStatusDoneCardsRes'
import { verifyTokenCoach } from '../middleware/coachAuth'
const router = Router()

router.get('/:activeChallengeId', verifyTokenCoach, async (req: Request, res: Response) => {
    try {
        let activeChallenge = await ActiveChallegeService.getSingleActiveChallenge(req.params.userId)
        res.send(activeChallenge)
    }
    catch (error) {
        res.status(400).send(error)
    }
})

router.get('/start/:activeChallengeId', async (req: Request, res: Response) => {
    try {
        // let activeChallenge: GetActiveChallToStartReq | null = await ActiveChallegeService.getActiveChallengeToStartScreen(req.params.activeChallengeId)
        // res.send(activeChallenge)
    }
    catch (error) {
        res.status(400).send(error)
    }
})

router.get('/status/:activeChallengeId', async (req: Request, res: Response) => {
    try {
        let userId = req.body.userId

        let startDeilyDeck: GetStatusDoneCardsRes = await ActiveChallegeService.getStartDailyDeck(userId, req.params.activeChallengeId)
        res.send(startDeilyDeck)
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
        console.log(error);

        res.status(400).send(error)
    }
})

// תשובה על קלף ספציפי
router.post('/:activeChallengeId/card/:cardId', async (req: Request, res: Response) => {
    try {
        let activeChallengeId = req.params.activeChallengeId;
        let cardId = req.params.cardId;
        await ActiveChallegeService.handleCardAnswer(activeChallengeId, cardId, req.body);
        res.send('sucsses');
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})

export default router;