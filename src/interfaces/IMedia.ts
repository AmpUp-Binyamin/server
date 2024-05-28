import Media from "../types/Media";

export default interface IMedia {
    _id?:string;
    type: Media; // "image", "video", "audio", "document"
    fileName: string;
    path: string;
}