import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from 'dotenv';
import multer from "multer";
import crypto from 'crypto';
import IMedia from "../interfaces/IMedia";
import Media from "../types/Media";

const storage = multer.memoryStorage()
export const upload = multer({ storage: storage })

const generateFileNamePrefex = (bytes = 3) => crypto.randomBytes(bytes).toString('hex')


dotenv.config();

const bucketName: string = process.env.AWS_BUCKET_NAME!;
const region: string = process.env.AWS_BUCKET_REGION!;
const accessKeyId: string = process.env.AWS_ACCESS_KEY!;
const secretAccessKey: string = process.env.AWS_SECRET_ACCESS_KEY!;

const s3Client = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey
    }
});

export async function uploadFileToAWS(fileBuffer: Buffer, fileName: string, mimetype: string): Promise<any> {
    const uploadParams = {
        Bucket: bucketName,
        Body: fileBuffer,
        Key: fileName,
        ContentType: mimetype
    };

    return s3Client.send(new PutObjectCommand(uploadParams));
}


export function deleteFile(fileName: string): Promise<any> {
    const deleteParams = {
        Bucket: bucketName,
        Key: fileName,
    };
    return s3Client.send(new DeleteObjectCommand(deleteParams));
}


export async function getObjectSignedUrl(key: string): Promise<string> {
    const params = {
        Bucket: bucketName,
        Key: key
    };

    const command = new GetObjectCommand(params);
    const seconds = 60;
    const url = await getSignedUrl(s3Client, command, { expiresIn: seconds });

    return url;
}




export async function uploadImage(imageData: Express.Multer.File): Promise<string | void> {
    if (!imageData) return;
    if (!imageData.mimetype.startsWith('image') || !imageData.buffer) { throw new Error('File is not an image') };
    const { buffer, mimetype } = imageData;
    const imageNamePrefex = generateFileNamePrefex();
    const imageName = `${imageNamePrefex}_${imageData.originalname}`;
    // const height = 1080, width = 1920
    // const fileBuffer = await sharp(buffer).resize( height, width ).toBuffer();
    await uploadFileToAWS(buffer, imageName, mimetype);
    return await getObjectSignedUrl(imageName);
}

export async function uploadFile(fileData: Express.Multer.File, fileType: null | Media = null): Promise<string | void> {
    if (!fileData || !fileData.buffer ) return;
    if (fileType){
        if (fileType !== fileData.mimetype.split('/')[0] ) throw new Error('incorrect file type')
    }
    const { buffer, mimetype } = fileData;
    const FileNamePrefex = generateFileNamePrefex();
    const fileName = `${FileNamePrefex}_${fileData.originalname}`;
    await uploadFileToAWS(buffer, fileName, mimetype);
    return await getObjectSignedUrl(fileName);
}