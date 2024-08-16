// src/routes/ChallengeRouter.ts
import { Router, Request, Response } from 'express';
import ChallengeService from '../services/ChallengeService';

const router = Router();
const challengeService = new ChallengeService();

router.post('/', async (req: Request, res: Response) => {
  try {
    const challenge = await challengeService.createChallenge(req.body);
    res.status(201).json(challenge);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const challenges = await challengeService.getChallenges(req.query);
    res.status(200).json(challenges);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const challenge = await challengeService.getChallengeById(req.params.id);
    if (challenge) {
      res.status(200).json(challenge);
    } else {
      res.status(404).json({ message: 'Challenge not found' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const challenge = await challengeService.updateChallenge(
      req.params.id,
      req.body,
    );
    if (challenge) {
      res.status(200).json(challenge);
    } else {
      res.status(404).json({ message: 'Challenge not found' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const success = await challengeService.deleteChallenge(req.params.id);
    if (success) {
      res.status(200).json({ message: 'Challenge marked as inactive' });
    } else {
      res.status(404).json({ message: 'Challenge not found' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
