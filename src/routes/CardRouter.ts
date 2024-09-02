// src/routes/CardRouter.ts
import { Router, Request, Response } from 'express';
import CardService from '../services/CardService';
import { verifyToken } from '../middleware/auth';

const router = Router();
const cardService = new CardService();

// Apply the verifyToken middleware to all routes
router.use(verifyToken);

router.post('/', async (req: Request, res: Response) => {
  try {
    const card = await cardService.createCard(req.body, req.body.userId);
    res.status(201).json(card);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const cards = await cardService.getCards(req.query, req.body.userId);
    res.status(200).json(cards);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const card = await cardService.getCardById(req.params.id, req.body.userId);
    if (card) {
      res.status(200).json(card);
    } else {
      res.status(404).json({ message: 'Card not found' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const card = await cardService.updateCard(req.params.id, req.body, req.body.userId);
    if (card) {
      res.status(200).json(card);
    } else {
      res.status(404).json({ message: 'Card not found' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const success = await cardService.deleteCard(req.params.id, req.body.userId);
    if (success) {
      res.status(200).json({ message: 'Card marked as inactive' });
    } else {
      res.status(404).json({ message: 'Card not found' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
