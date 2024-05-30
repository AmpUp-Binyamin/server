import { Request, Response, Router } from 'express'
const router = Router()

router.all('/checkEmail', async (req: Request, res: Response) => {
    try {
console.log(15);

    }
    catch (error) {
        res.status(400).send(error)
    }
})
export default router