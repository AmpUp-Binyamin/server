import { Request, Response, Router } from 'express'
import { Mapper } from '../helpers/Mapper'
import ActiveChallegeService from '../services/ActiveChallengeService'
import AddActiveChallengeRequest from '../dto/activeChallenge/AddActiveChallengeRequest'
import IActiveChallenge from '../interfaces/IActiveChallenge'
import GetActiveChallToStartReq from '../dto/activeChallenge/GetActiveChallToStartReq'
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

router.get('/start/:activeChallengeId', async (req: Request, res: Response) => {
    try {
        let activeChallenge: GetActiveChallToStartReq | null = await ActiveChallegeService.getActiveChallengeToStartScreen(req.params.activeChallengeId)
        res.send(activeChallenge)
    }
    catch (error) {
        res.status(400).send(error)
    }
})

// router.get('/status/:activeChallengeId', async (req: Request, res: Response) => {
//     try {
//         let startDeilyDeck = await ActiveChallegeService.getStartDailyDeck(req.params.activeChallengeId)
//         res.send(startDeilyDeck)
//     }
//     catch (error) {
//         res.status(400).send(error)
//     }
// })

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


export default router;