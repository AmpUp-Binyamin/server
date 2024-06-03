import { Request, Response, Router } from 'express';
import { tempImgUpload, tempMediaUpload, validateAndUploadImg, validateAndUploadMedia } from '../middleware/s3';

const router: Router = Router();

router.post("/img", tempImgUpload, async (req: Request, res: Response) => {
    try {
        if (req.file) {
            let url = await validateAndUploadImg(req.file)
            console.log(url)
        }
        res.send("Files uploaded successfully.");
    } catch (error) {
        console.log('Error:', error);
        res.status(666).send("error not found");
    }
});
router.post("/media", tempMediaUpload, async (req: Request, res: Response) => {
    try {
        if (req.file) {
            let media = await validateAndUploadMedia(req.file)
            console.log(media)
        }
        res.send("Files uploaded successfully.");
    } catch (error) {
        console.log('Error:', error);
        res.status(666).send("error not found");
    }
});

// router.post("/", uploadAnyFileFS.any(), (req: Request, res: Response) => {
//     try {
//         let files = req.files as Express.Multer.File[];
//         console.log(files[0].mimetype);
//         res.send("Files uploaded successfully.");
//     } catch (error) {
//         console.log('Error:', error);
//         res.status(500).send("An error occurred during file upload.");
//     }
// });


// router.post("/img", uploadImageFS.any(), (req: Request, res: Response) => {
//     try {
//         let files = req.files as Express.Multer.File[];
//         console.log(files[0].mimetype);
//         res.send("Files uploaded successfully.");
//     } catch (error) {
//         console.log('Error:', error);
//         res.status(500).send("An error occurred during file upload.");
//     }
// });



// router.get("/", (req: Request, res: Response) => {
//     try {
//         res.send("yep");
//     } catch (error) {
//         console.log(error);
//     }
// });



export default router;
