// src/routes/TeamRouter.ts
import { Router, Request, Response } from 'express';
import TeamService from '../services/TeamService';

const router = Router();
const teamService = new TeamService();

router.post('/', async (req: Request, res: Response) => {
    try {
        const team = await teamService.createTeam(req.body);
        res.status(201).json(team);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/', async (req: Request, res: Response) => {
    try {
        const teams = await teamService.getTeams(req.query);
        res.status(200).json(teams);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const team = await teamService.getTeamById(req.params.id);
        if (team) {
            res.status(200).json(team);
        } else {
            res.status(404).json({ message: 'Team not found' });
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const team = await teamService.updateTeam(req.params.id, req.body);
        if (team) {
            res.status(200).json(team);
        } else {
            res.status(404).json({ message: 'Team not found' });
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const success = await teamService.deleteTeam(req.params.id);
        if (success) {
            res.status(200).json({ message: 'Team marked as inactive' });
        } else {
            res.status(404).json({ message: 'Team not found' });
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

export default router;
