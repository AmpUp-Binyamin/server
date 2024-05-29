import { Request, Response, Router } from 'express';
import { Mapper } from '../helpers/Mapper';
import { uploadImage, uploadAnyFile } from "../middleware/media"

const router: Router = Router();

router.post("/", uploadAnyFile.any(), (req: Request, res: Response) => {
    try {
        let files = req.files as Express.Multer.File[];
        console.log(files[0].mimetype);
        res.send("Files uploaded successfully.");
    } catch (error) {
        console.log('Error:', error);
        res.status(500).send("An error occurred during file upload.");
    }
});
router.post("/img", uploadImage.any(), (req: Request, res: Response) => {
    try {
        let files = req.files as Express.Multer.File[];
        console.log(files[0].mimetype);
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
