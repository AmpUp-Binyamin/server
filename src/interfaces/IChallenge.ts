import { Document } from "mongoose"
import ICard from "./ICard";
import IStoreItem from "./IStoreItem";
 
export default interface IChallenge extends Partial<Document> {
    challengeName: string;
    coverImage: string;
    subDescription: string;
    duration: number; 
    tags: string[];
    isPublic: boolean;
    isTemplate: boolean;
    creator?: string; 
    store: IStoreItem[];
    cards: ICard[];
    invited: string[]; 
}

