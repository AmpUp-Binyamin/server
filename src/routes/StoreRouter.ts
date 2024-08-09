import { Request, Response, Router } from "express";
import ChallengeController from "../controllers/ChallengeController";
import StoreService from "../services/old/Store.Service";
import IChallenge from "../interfaces/IChallenge";
import ActiveChallegeService from "../services/old/ActiveChallengeService";

const router = Router();

router.get("/:active_challenge_id", async (req: Request, res: Response) => {
  try {
    let challenge: any = await ActiveChallegeService.getSingleActiveChallenge(
      req.params.active_challenge_id
    );
    console.log(" r ", challenge);
    if (challenge?.challenge) {
      let store = await StoreService.getChallenge(challenge?.challenge);
      console.log(" r ", store);
      return res.send(store);
    } else {
      return res.status(400).send("No challenge found");
    }
  } catch (error) {
    console.log("Store Router Error: ", error);
    return res.status(400).send(error);
  }
});

router.put("/:storeItemId", async (req: Request, res: Response) => {
  try {
    let memberId = req.body.userId;
    let challengeId = req.body.challengeId;
    let storeItemId = req.params.storeItemId;
    let updatedChallenge: IChallenge | null =
      await StoreService.updateMemberItems(memberId, challengeId, storeItemId);
    res.send(updatedChallenge);
  } catch (error) {
    res.status(400).send(error);
  }
});

// router.put('active/:storeItemId', async (req: Request, res: Response) => {
//   try {
//     let memberId = req.body.userId
//     let challengeId = req.body.challengeId
//     let storeItemId = req.params.storeItemId
//     let updatedChallenge: IChallenge | null = await StoreService.updateMemberItems(memberId, challengeId, storeItemId)
//     res.send(updatedChallenge)
//   }
//   catch (error) {
//     res.status(400).send(error)
//   }
// })

export default router;
