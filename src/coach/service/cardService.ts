import { ObjectId } from "mongoose";
import ChallengeController from "../../controllers/ChallengeController";
import ICard from "../../interfaces/ICard";
import CreateCardRequest from "../dto/CreateCardRequest";
// import IChallenge from "../interfaces/IChallenge";


export default class CardService {
    static controller = new ChallengeController()
    // יצירת קלף בעידכון באתגר

    //  לבדוק את הeinem שלא יפיל בזמן ריצה שזה באמת מהסוג הנכון
    // לבדוק שאין כבר את הכרטיס מהסוג הזה באותו יום
    static async crateCard(data: CreateCardRequest) {//: Promise<IChallenge>{

        const challenge = await this.controller.readOne(data.challengeId);
        if (!challenge) throw { code: 400, message: "not found challenge" }
        if (String(data.userId) != String(challenge.creator)) throw { code: 400, message: "not creator" }
        const card: Partial<ICard> = {
            day: data.day,
            cardOrder: data.cardOrder,
            cardType: data.cardType,
            subType: data.subType,
            answers: data.answers,
            title: data.title,
            content: data.content,
            coins: data.coins,
            image: data.image,
            drawProbability: data.drawProbability,
            winProbability: data.winProbability,
            media: data.media
        }

        const existingCard = challenge.cards.find(
            (c) => c.day === data.day && c.cardType === data.cardType
        );
        if (existingCard) {
            throw { code: 400, message: `A card of type ${data.cardType} already exists for day ${data.day}` };
        }
        const newCard = await this.controller.update(data.challengeId, { $push: { cards: card } })
        return newCard;
    }
}






//לפתוח אתגר פעיל להכניס משתתפים להכניס את האתגר את הקוצר תאריך פתיחה.
