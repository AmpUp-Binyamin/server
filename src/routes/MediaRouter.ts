import fs from "fs"
import multer from "multer"
import { Request, Response, Router } from 'express'
import { Mapper } from '../helpers/Mapper'
const router = Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = './files';
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage })

router.post("/", upload.any(), (req, res) => {
    try {
        console.log(req.file); // Log information about the uploaded file
        res.send("File uploaded successfully."); // Respond to the client indicating success
    } catch (error) {
        console.log('Error:', error); // Log any errors that occur during file upload
        res.status(500).send("An error occurred during file upload."); // Respond with an error message to the client
    }
})

router.get("/", (req, res) => {
    try {
        res.send("yep")

    } catch (error) {
        console.log(error);

    }
})  


export default router;