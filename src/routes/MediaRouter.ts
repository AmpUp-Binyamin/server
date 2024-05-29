import fs from "fs";
import multer, { Multer } from "multer";
import { Request, Response, Router } from 'express';
import { Mapper } from '../helpers/Mapper';

const router: Router = Router();

const storage: multer.StorageEngine = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
        const uploadPath: string = './files';
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
        cb(null, file.originalname);
    }
});

const upload: Multer = multer({ storage: storage });

router.post("/", upload.any(), (req: Request, res: Response) => {
    try {
        // console.log(req.files); 
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
