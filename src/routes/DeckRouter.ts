// src\routes\DeckRouter.ts
import { Router, Request, Response } from 'express';
import DeckService from '../services/DeckService';

const router = Router();
const deckService = new DeckService();

router.post('/', async (req: Request, res: Response) => {
    try {
        const deck = await deckService.createDeck(req.body);
        res.status(201).json(deck);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/', async (req: Request, res: Response) => {
    try {
        const decks = await deckService.getDecks(req.query);
        res.status(200).json(decks);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const deck = await deckService.getDeckById(req.params.id);
        if (deck) {
            res.status(200).json(deck);
        } else {
            res.status(404).json({ message: 'Deck not found' });
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const deck = await deckService.updateDeck(req.params.id, req.body);
        if (deck) {
            res.status(200).json(deck);
        } else {
            res.status(404).json({ message: 'Deck not found' });
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const success = await deckService.deleteDeck(req.params.id);
        if (success) {
            res.status(200).json({ message: 'Deck marked as inactive' });
        } else {
            res.status(404).json({ message: 'Deck not found' });
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

export default router;
