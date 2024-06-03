import { Request, Response, Router } from "express";
import CoachService from "../services/CoachService";
import { Mapper } from "../helpers/Mapper";
import { CreateCoachRequest } from "../dto/coach/CoachRequest";
import { verifyTokenCoach } from "../middleware/coachAuth";
import { tempImgUpload as tempImgUpload, validateAndUploadImg } from "../middleware/s3";

const router = Router()


router.get('/:userId', verifyTokenCoach, async (req: Request, res: Response) => {
    try {
        let coach = await CoachService.getSingleCoach(req.params.userId)
        res.send(coach)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/', tempImgUpload, async (req: Request, res: Response) => {
    try {
        let request = Mapper<CreateCoachRequest>(new CreateCoachRequest(), req.body)
        let coach = await CoachService.createNewCoach(request)
        if (req.file) {
            let url = await validateAndUploadImg(req.file)
            console.log(url)
            if (url) {
              coach = await  CoachService.updateCoach(coach?._id as string, { picture: url })
            }
        }
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