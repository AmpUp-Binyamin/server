import { ObjectId as MongoDBObjectId } from 'mongodb';
import { ObjectId, isValidObjectId } from "mongoose";
import activeChallengeController from "../controllers/ActiveChallengeController";
import ChallengeController from "../controllers/ChallengeController";
import MemberController from "../controllers/MemberControllers";
import GetActiveChallToStartReq from "../dto/activeChallenge/GetActiveChallToStartReq";
import { FutureDateCalc } from "../helpers/FutureDateCalc";
import { RandomNumberGenerator } from "../helpers/luck";
import IChallenge from "../interfaces/IChallenge";
import ICoach from "../interfaces/ICoach";
import IMember from "../interfaces/IMember";

import IActiveChallenge, { IActiveCard } from "../interfaces/IActiveChallenge";
import ICard from '../interfaces/ICard';
import GetStatusDoneCardsRes from '../dto/activeChallenge/GetStatusDoneCardsRes';

export default class ActiveChallegeService {
    static controller = new activeChallengeController();
    static RandomGenerator = new RandomNumberGenerator();
    static memberController = new MemberController();
    static challengeController = new ChallengeController();

    static async getSingleActiveChallenge(
        id: string
    ): Promise<IActiveChallenge | null> {
        return await this.controller.readOne(id);
    }

    static async getActiveChallengeToStartScreen(
        id: string
    ): Promise<GetActiveChallToStartReq | null> {
        let activeChallenge: IActiveChallenge | null | undefined =
            await this.controller.readOneWithPopulate(
                id,
                {
                    participants: "img",
                    coach: "fullName picture title",
                    challenge: "challengeName coverImage subDescription duration",
                },
                "startDate participants"
            );
        if (!activeChallenge) return null;
        if (!("_id" in activeChallenge.challenge)) return null;
        const duration = (activeChallenge.challenge as IChallenge)
            .duration as number;
        const futureDate: Date = FutureDateCalc(
            activeChallenge.startDate,
            duration
        );
        const { startDate, challenge, participants, coach } = activeChallenge;
        const res = new GetActiveChallToStartReq(
            startDate,
            futureDate,
            participants as IMember[],
            challenge as IChallenge,
            coach as ICoach
        );
        return res;
    }

    static async getStartDailyDeck(userId: ObjectId, id: string) {


        const activeChallenge: IActiveChallenge | null | undefined = await this.controller.readOneWithPopulate(id, { challenge: '_id cards duration challengeName', coach: 'fullName picture title' })
        if (!activeChallenge) throw ''

        const challenge = activeChallenge.challenge as Partial<IChallenge>
        if (!challenge.cards) throw ''
        const coach: Partial<ICoach> = activeChallenge.coach as Partial<ICoach>
        let cards: ICard[] = challenge.cards as ICard[]
        const totalDays: number = challenge.duration as number
        const challengeName: string = challenge.challengeName as string



        const numCardsOfDay: number[] = []
        const completedDays: number[] = []

        cards?.forEach(card => {
            (numCardsOfDay[card.day - 1] === undefined) ? numCardsOfDay[card.day - 1] = 1 : ++(numCardsOfDay[card.day - 1])
        })

        const memberCards: IActiveCard[] = activeChallenge.cards.filter(card => String(card.member) == String(userId))

        numCardsOfDay.forEach((num, day) => {
            const activeCard: IActiveCard[] = memberCards.filter(c => c.challengeDay == day + 1)
            if (activeCard.length == num) completedDays.push(day + 1)
        })
        let currentDay = Math.floor((Date.now() - activeChallenge.startDate.getTime()) / (1000 * 60 * 60 * 24))
        const currentCards: ICard[] = cards.filter(card => card.day == currentDay)
        const cardsStatus: ICard[] = currentCards.map(card => {
            const done: IActiveCard | undefined = memberCards.find(c => String(c.card) == card._id)
            return ({ ...card, done: Boolean(done) })
        })

        return new GetStatusDoneCardsRes(cardsStatus, totalDays, completedDays, coach, challengeName)
    }

    // static async getStartDailyDeck(id: string): Promise<>

    static async createNewActiveChallenge(data: any): Promise<IActiveChallenge> {
        if (!data.challenge) {
            throw { code: 400, msg: "challenge not found" };
        }
        if (!data.startDate) {
            throw { code: 400, msg: "start date not found" };
        }
        let newActiveChallenge: IActiveChallenge = {
            coach: data.userId,
            challenge: data.challenge,
            invited: [],
            participants: [],
            startDate: data.startDate,
            cards: [],
        };
        return await this.controller.create(newActiveChallenge);
    }

    static async loveCard(challengeId: string): Promise<any> {
        let challenge = await this.controller.readOne(challengeId, "participants");
        if (!challenge) throw { code: 400, message: "go to hell!!!" };
        let num = challenge.participants.length;
        let user =
            challenge.participants[this.RandomGenerator.getRandom(0, num - 1)];
console.log({user});

        return await this.memberController.readOne(String(user));
    }

    static async handleCardAnswer(
        activeChallengeId: string,
        cardId: string,
        answer: any
    ): Promise<IActiveCard> {
        if (!activeChallengeId || !cardId) throw { code: 400, msg: "missing data" };
        if (!isValidObjectId(activeChallengeId))
            throw { code: 400, msg: "challengeId is not ObjectId" };
        if (!isValidObjectId(cardId))
            throw { code: 400, msg: "cardId is not ObjectId" };

        // מציאת האתגר בדטאבייס
        // מציאת האתגר הפעיל
        let activeChallenge = await this.controller.readOne(activeChallengeId);
        if (!activeChallenge)throw { code: 400, msg: "Active challenge not found" };
        let challenge = await this.challengeController.readOne(String(activeChallenge.challenge))
        if (!challenge) throw { code: 400, msg: "challenge not found" };

        // מציאת הכרטיס
        let card = challenge.cards.find((card) => card._id == cardId);
        if (!card) throw { code: 400, msg: "card not found" };



        // יצירת הקלף להוספה לאתגר הפעיל
        const cardToAdd: IActiveCard = {
            member: answer.userId,
            card: new MongoDBObjectId(card._id),
            challengeDay: card.day,
            coins: card.coins,
            answerValue: answer.value,
            answerMedia: [], //TODO: handle files
        };

        console.log("value: ", answer.value);
        // הוספת הקלף החדש לאתגר הפעיל
        await this.controller.update(activeChallenge._id as string, {
            $push: { cards: cardToAdd },
        });
        return cardToAdd;
    }


}
// class checkWhyGetFeedback(userId: ObjectId, challenge: any): Promise<>{

// }
