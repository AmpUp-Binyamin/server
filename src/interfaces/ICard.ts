import IMedia from "./IMedia";

export default interface ICard {
    _id?: string;
    day: number;
    cardOrder: number;
    cardType: 'question' | 'challenge' | 'media' | 'study' | 'lottery' | 'love'; // יעבור להיות Union
    subType?: string;// יעבור להיות Union
    title: string;
    content: string;
    media?: IMedia;
    coins: number;
    image?: string;
    drawProbability?: number; // אחוז הופעה (רק בקלף הגרלה)
    winProbability?: number; // אחוז זכייה (רק בקלף הגרלה)
}