import { isObjectIdOrHexString, isValidObjectId } from "mongoose"
import { ObjectId } from 'mongodb'
import activeChallengeController from "../controllers/ActiveChallengeController"
import ChallengeController from "../controllers/ChallengeController"
import MemberController from "../controllers/MemberControllers"
import AddActiveChallengeRequest from "../dto/activeChallenge/AddActiveChallengeRequest"
import GetActiveChallToStartReq from "../dto/activeChallenge/GetActiveChallToStartReq"
import { FutureDateCalc } from "../helpers/FutureDateCalc"
import { RandomNumberGenerator } from "../helpers/luck"
import IChallenge from "../interfaces/IChallenge"
import ICoach from "../interfaces/ICoach"
import IMember from "../interfaces/IMember"

import IActiveChallenge, { IActiveCard } from "../interfaces/IActiveChallenge"
import ICard from "../interfaces/ICard"

export default class ActiveChallegeService {
    static controller = new activeChallengeController();
    static challengeController = new ChallengeController();
    static RandomGenerator = new RandomNumberGenerator();
    static memberController = new MemberController();

    static async getSingleActiveChallenge(id: string): Promise<IActiveChallenge | null> {
        return await this.controller.readOne(id)
    }

    static async getActiveChallengeToStartScreen(id: string): Promise<GetActiveChallToStartReq | null> {
        let activeChallenge: IActiveChallenge | null = await this.controller.readOneWithPopulate(id, { participants: 'img', coach: 'fullName picture title', challenge: 'challengeName coverImage subDescription duration' }, 'startDate participants')
        if (!activeChallenge) return null
        if (!('_id' in activeChallenge.challenge)) return null;
        const duration = ((activeChallenge.challenge) as IChallenge).duration as number
        const futureDate: Date = FutureDateCalc(activeChallenge.startDate, duration)
        const { startDate, challenge, participants, coach } = activeChallenge
        const res = new GetActiveChallToStartReq(startDate, futureDate, participants as IMember[], challenge as IChallenge, coach as ICoach)
        return res
    }

    static async getStartDailyDeck(userId: string, id: string) {

        let challenge = await this.challengeController.readOneWithPopulate(id, {}, 'cards')

        const numCardsOfDay: number[] = []

        challenge?.cards.forEach(card => {
            (numCardsOfDay[card.day - 1] === undefined) ? numCardsOfDay[card.day - 1] = 1 : ++(numCardsOfDay[card.day - 1])
        })

        let activeChallenge = (await this.controller.read({ challeng: id }))[0]

        console.log(activeChallenge);


        // let currentDay = Math.floor((Date.now() - activeChallenge.startDate.getTime()) / (1000 * 60 * 60 * 24))





    }

    static async createNewActiveChallenge(data: any): Promise<IActiveChallenge> {
        if (!data.challenge) {
            throw { code: 400, msg: "challenge not found" }
        }
        if (!data.startDate) {
            throw { code: 400, msg: "start date not found" }
        }
        let newActiveChallenge: IActiveChallenge = {
            coach: data.userId,
            challenge: data.challenge,
            invited: [],
            participants: [],
            startDate: data.startDate,
            cards: []
        }
        return await this.controller.create(newActiveChallenge)
    }

    static async loveCard(challengeId: string): Promise<any> {

        let challenge = await this.controller.readOne(challengeId, 'participants')
        if (!challenge) throw { code: 400, message: "go to hell!!!" };
        let num = challenge.participants.length
        let user = challenge.participants[this.RandomGenerator.getRandom(0, num - 1)];


        return await this.memberController.readOne(String(user))
    }

    static async handleCardAnswer(challengeId: string, cardId: string, answer: any): Promise<IActiveCard> {
        console.log({ challengeId, cardId, answer });
        if (!challengeId || !cardId) throw { code: 400, msg: "missing data" };
        if (!isValidObjectId(challengeId)) throw { code: 400, msg: "challengeId is not ObjectId" };
        if (!isValidObjectId(cardId)) throw { code: 400, msg: "cardId is not ObjectId" };

        // מציאת האתגר בדטאבייס
        let challenge = await this.challengeController.readOne(challengeId);
        if (!challenge) throw { code: 400, msg: "challenge not found" };

        // מציאת הכרטיס
        let card = challenge.cards.find(card => card._id == cardId);
        if (!card) throw { code: 400, msg: "card not found" };

        // מציאת האתגר הפעיל
        let activeChallenge = await this.controller.read({ challenge: challengeId })
        if (!activeChallenge[0]) throw { code: 400, msg: "Active challenge not found" };

        // יצירת הקלף להוספה לאתגר הפעיל
        const cardToAdd: IActiveCard = {
            member: answer.userId,
            card: new ObjectId(card._id),
            challengeDay: card.day,
            coins: card.coins,
            answerValue: answer.value,
            answerMedia: [],//TODO: handle files
        }

        console.log('value: ', answer.value)
        // הוספת הקלף החדש לאתגר הפעיל
        await this.controller.update(activeChallenge[0]._id as string, { $push: { cards: cardToAdd } });
        return cardToAdd;
    }
}









