import { ObjectId } from "mongodb";
import IMedia from "../../interfaces/IMedia";

export class CardResponse {
    challengeName: string;
    title: string;
    media: IMedia;
    id: ObjectId;

    constructor(ch: string = '', title: string = '', media: IMedia = {} , id: ObjectId = new ObjectId()) {
        this.challengeName = ch;
        this.title = title;
        this.media = media;
        this.id = id;
    }
}
