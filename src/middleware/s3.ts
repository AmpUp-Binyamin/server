import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from 'dotenv';
import multer from "multer";
import crypto from 'crypto';
import sharp from "sharp";

const storage = multer.memoryStorage()
export const upload = multer({ storage: storage })

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')


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

export async function uploadFile(fileBuffer: Buffer, fileName: string, mimetype: string): Promise<any> {
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

export async function processAndUploadImage(imageData: Express.Multer.File,): Promise<string | void> {
    if (!imageData) return;
    const { buffer, mimetype } = imageData;
    const imageName = generateFileName();
    // const height = 1080, width = 1920
    // const fileBuffer = await sharp(buffer).resize( height, width ).toBuffer();
    await uploadFile(buffer, imageName, mimetype);
    return await getObjectSignedUrl(imageName);

}