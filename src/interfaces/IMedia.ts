import Media from "../types/Media";

export default interface IMedia {
    _id?:string;
    type?: Media; // "image", "video", "audio", "document", "other"
    fileName?: string;
    path?: string;
    content?: string;
}