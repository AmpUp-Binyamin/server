import { Request, Response, Router } from "express";
import Tehill from "../services/Tehill";

const router = Router()

router.get('/', async (req: Request, res: Response) => {
    try {
        let team = await Tehill();
        res.send(team);
    } catch (error) {
        res.status(400).send(error)
    }
})

export default router