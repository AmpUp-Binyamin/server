// src/routes/AnswerRouter.ts
import { Router, Request, Response } from 'express';
import AnswerService from '../services/AnswerService';

const router = Router();
const answerService = new AnswerService();

router.post('/', async (req: Request, res: Response) => {
    try {
        const answer = await answerService.createAnswer(req.body);
        res.status(201).json(answer);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/', async (req: Request, res: Response) => {
    try {
        const answers = await answerService.getAnswers(req.query);
        res.status(200).json(answers);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const answer = await answerService.getAnswerById(req.params.id);
        if (answer) {
            res.status(200).json(answer);
        } else {
            res.status(404).json({ message: 'Answer not found' });
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const answer = await answerService.updateAnswer(req.params.id, req.body);
        if (answer) {
            res.status(200).json(answer);
        } else {
            res.status(404).json({ message: 'Answer not found' });
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const success = await answerService.deleteAnswer(req.params.id);
        if (success) {
            res.status(200).json({ message: 'Answer marked as inactive' });
        } else {
            res.status(404).json({ message: 'Answer not found' });
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

export default router;
