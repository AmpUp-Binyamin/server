// src/routes/PrizeRouter.ts
import express, { Request, Response } from 'express';
import PrizeService from '../services/PrizeService';
import IPrize from '../interfaces/IPrize';

const router = express.Router();
const prizeService = new PrizeService();

// Create a new prize
router.post('/', async (req: Request, res: Response) => {
    try {
        const createdPrize = await prizeService.createPrize(req.body);
        res.status(201).json(createdPrize);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all prizes
router.get('/', async (req: Request, res: Response) => {
    try {
        const filter: Partial<IPrize> = req.query;
        const prizes = await prizeService.getPrizes(filter);
        res.status(200).json(prizes);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a prize by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const prize = await prizeService.getPrizeById(id);
        if (prize) {
            res.status(200).json(prize);
        } else {
            res.status(404).json({ message: 'Prize not found' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a prize by ID
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const updatedPrize = await prizeService.updatePrize(id, req.body);
        if (updatedPrize) {
            res.status(200).json(updatedPrize);
        } else {
            res.status(404).json({ message: 'Prize not found' });
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

// Soft delete a prize by ID
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const success = await prizeService.deletePrize(id);
        if (success) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Prize not found' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;
