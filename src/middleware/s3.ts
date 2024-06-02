import { S3Client, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import  { Request, Response, NextFunction } from 'express';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from 'dotenv';
import multer from "multer";
import multerS3 from 'multer-s3';
import Media from "../types/Media";

dotenv.config();

const bucket: string = process.env.AWS_BUCKET_NAME!;
const region: string = process.env.AWS_BUCKET_REGION!;
const accessKeyId: string = process.env.AWS_ACCESS_KEY!;
const secretAccessKey: string = process.env.AWS_SECRET_ACCESS_KEY!;

const s3 = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey
    }
});

export const upload = multer({
    storage: multerS3({
        s3,
        bucket,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req: Express.Request, file: Express.Multer.File, cb: (error: any, metadata?: any) => void) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req: Express.Request, file: Express.Multer.File, cb: (error: any, key?: string | undefined) => void) {
            cb(null, Date.now().toString() + '_' + file.originalname);
        },
    })

})

const saveFileUrlToBodyc = async (req: Request, res: Response, next: NextFunction) => {
    if (req.file) {
        console.log(req.file);
        const Key = (req.file as any).key; // The key property is now recognized
        const command = new GetObjectCommand({
            Bucket: bucket,
            Key
        });
        try {
            // Generate a pre-signed URL for the uploaded file
            const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 }); // Adjust the expiration time (in seconds) as needed
            req.body.media = signedUrl;
        } catch (error) {
            console.error("Error generating pre-signed URL:", error);
            return next(error);
        }
    }
    next();
};

export async function getObjectSignedUrl(key: string): Promise<string> {
    const params = {
        Bucket: bucket,
        Key: key
    };
    const command = new GetObjectCommand(params);
    const seconds = 60;
    const url = await getSignedUrl(s3, command, { expiresIn: seconds });

    return url;
}


export function deleteFile(fileName: string): Promise<any> {
    const deleteParams = {
        Bucket: bucket,
        Key: fileName,
    };
    return s3.send(new DeleteObjectCommand(deleteParams));
}

const uploadFiletest = upload.single('file');

export const uploadAndSaveUrl = [uploadFiletest, saveFileUrlToBodyc];
