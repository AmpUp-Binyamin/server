// src\routes\old\ChallengeRouter.ts
import { Request, Response, Router } from "express";
import ChallengeService from "../../services/old/ChallengeService";
import { verifyTokenCoach } from "../../middleware/coachAuth";

const router = Router();

router.get("/start/:challengeId", async (req: Request, res: Response) => {
  try {
    let challenge = await ChallengeService.getOneChallenge(
      req.params.challengeId
    );
    res.send(challenge);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});
//get all challenges of coach
router.get("/coach/", verifyTokenCoach, async (req: Request, res: Response) => {
  try {
    let challenges = await ChallengeService.getAllChallengesOfCoach(
      req.body.coachId
    );
    res.send(challenges);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

//get all challenges of user

export default router;
