import { Request, Response, Router } from "express";
import ChallengeController from "../controllers/ChallengeController";
import StoreService from "../services/Store.Service";

const router = Router();

router.get("/:challenge_id", async (req: Request, res: Response) => {
  try {
    let challenge = await StoreService.getChallenge(req.params.challenge_id);
    console.log( " r ",  challenge);
    res.send(challenge);
    
  } catch (error) {
    res.status(400).send(error)
  }
});

router.put('/:storeItemId', async (req: Request, res: Response) => {
  try {
     let memberId = req.body.memberId
     let challengeId = req.body.challengeId
     let storeItemId = req.params.storeItemId
     let toBuy = await StoreService.updateMemberItems(memberId,challengeId,storeItemId)
      res.send("ok")
  }
  catch (error) {
      res.status(400).send(error)
  }
})




export default router