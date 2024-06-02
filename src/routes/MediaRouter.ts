import { Request, Response, Router } from 'express';
import { uploadImageFS, uploadAnyFileFS, } from "../middleware/media"
import { uploadFile, uploadImage, upload } from '../middleware/s3';

const router: Router = Router();

router.post("/img", upload.single('img'), async (req: Request, res: Response) => {
    try {
       let path = await uploadFile(req.file as Express.Multer.File)
        console.log(path);
        res.send("Files uploaded successfully.");
    } catch (error) {
        console.log('Error:', error);
        res.status(500).send(error);
    }
});

router.post("/", uploadAnyFileFS.any(), (req: Request, res: Response) => {
    try {
        let files = req.files as Express.Multer.File[];
        console.log(files[0].mimetype);
        res.send("Files uploaded successfully.");
    } catch (error) {
        console.log('Error:', error);
        res.status(500).send("An error occurred during file upload.");
    }
});


router.post("/img", uploadImageFS.any(), (req: Request, res: Response) => {
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
