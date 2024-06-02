import { Request, Response, Router } from "express";
import CoachService from "../services/CoachService";
import { Mapper } from "../helpers/Mapper";
import { CreateCoachRequest } from "../dto/coach/CoachRequest";
import { uploadImage } from "../middleware/media"
import { verifyTokenCoach } from "../middleware/coachAuth";
import CreateCardRequest from "../coach/dto/CreateCardRequest";
import CardService from "../coach/service/CardService";


const router = Router()


router.get('/:userId', verifyTokenCoach,  async (req: Request, res: Response) => {
    try {
        let coach = await CoachService.getSingleCoach(req.params.userId)
        res.send(coach)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/', uploadImage.single("img"), async (req: Request, res: Response) => {
    try {
        req.body.picture = req.file?.path
        let request = Mapper<CreateCoachRequest>(new CreateCoachRequest(), req.body)
        let coach = await CoachService.createNewCoach(request)
        res.send(coach)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.put('/newCard/:challengeId',verifyTokenCoach, async (req: Request, res: Response) => {

    try {
let request= Mapper<CreateCardRequest>(new CreateCardRequest(), req.body)
request.challengeId =req.params.challengeId
request.userId= req.body.userId
        let coach = await CardService.crateCard( request)
        res.send(coach)
    } catch (error) {
        res.status(400).send(error)
    }
})

// router.put("/img", uploadImage.any(), (req: Request, res: Response) => {
//     try {
//         let files = req.files as Express.Multer.File[];
//         console.log(files[0].mimetype);
//         res.send("Files updated successfully.");
//     } catch (error) {
//         console.log('Error:', error);
//         res.status(500).send("An error occurred during file update.");
//     }
// });


export default router;