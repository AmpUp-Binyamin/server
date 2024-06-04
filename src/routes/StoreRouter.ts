import { Request, Response, Router } from "express";
import ChallengeController from "../controllers/ChallengeController";
import StoreService from "../services/Store.Service";
import ActiveChallegeService from "../services/ActiveChallengeService";

const router = Router();

router.get("/:active_challenge_id", async (req: Request, res: Response) => {
  try {
    let challenge:any = await ActiveChallegeService.getSingleActiveChallenge(req.params.active_challenge_id)
    console.log(" r ", challenge);
    if (challenge?.challenge) {
      let store = await StoreService.getChallenge(challenge?.challenge);
      console.log(" r ", store);
      res.send(store);
    }
    res.status(400).send("No challenge found")

  } catch (error) {
    res.status(400).send(error)
    console.log("Store Router Error: ", error);

  }
});

router.put('/:storeItemId', async (req: Request, res: Response) => {
  try {
    let memberId = req.body.memberId
    let challengeId = req.body.challengeId
    let storeItemId = req.params.storeItemId
    let toBuy = await StoreService.updateMemberItems(memberId, challengeId, storeItemId)
    res.send("ok")
  }
  catch (error) {
    res.status(400).send(error)
  }
})




export default router