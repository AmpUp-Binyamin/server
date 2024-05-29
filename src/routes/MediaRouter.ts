import { Request, Response, Router } from 'express';
import { Mapper } from '../helpers/Mapper';
// import {router , storage , upload} from '../middleware/media'
import { upload } from "../middleware/media"

const router: Router = Router();


router.post("/", upload.any(), (req: Request, res: Response) => {
    try {
        let files = req.files as Express.Multer.File[]
        console.log('***************&&&&&&&&&&&&&&&&&&&&&&&&');

        console.log(files[0].originalname);
        res.send("Files uploaded successfully.");



    } catch (error) {
        console.log('Error:', error);
        res.status(500).send("An error occurred during file upload.");
    }
});

router.get("/", (req: Request, res: Response) => {
    try {
        res.send("yep");
    } catch (error) {
        console.log(error);
    }
});



export default router;
