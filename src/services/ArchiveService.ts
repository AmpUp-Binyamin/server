import { ObjectId } from "mongoose"
import activeChallengeController from "../controllers/ActiveChallengeController"
import ChallengeController from "../controllers/ChallengeController"
import CoachController from "../controllers/CoachController"
import MemberController from "../controllers/MemberControllers"
import IActiveChallenge from "../interfaces/IActiveChallenge"
import IChallenge from "../interfaces/IChallenge"




export default class ArchiveService {
    static challengeController = new ChallengeController()
    static activeChallengeController = new activeChallengeController()
    static memberController = new MemberController()
    static coachController = new CoachController()



    static async getMemberChallenges(id: string): Promise<IChallenge[] | null> {
        let member = await this.memberController.readWithChallenge(id)
        if (!member) {
            return null;
        }
        let memberChallenges = member?.myChallenge as IChallenge[]

        let startDates: Array<IActiveChallenge | null> = await Promise.all(
            memberChallenges.map((ch) => {
                const challengeId = (ch as { _id: ObjectId })._id.toString();
                return this.memberController.readStartDate(challengeId);

            })
        );

        let finel = memberChallenges.map((ch, index) => ({
            ...ch,
            startDate: startDates[index]?.startDate,
            endDate: this.calculateEndDate(startDates[index]?.startDate, ch.duration),
            cards: ch.cards
                .map((card) => ({
                    ...card,
                    date: this.calculateEndDate(startDates[index]?.startDate, card.day)
                }))
                .filter((card) => {
                    if (typeof card.date === 'string') {
                        const dateObj = new Date(card.date);
                        if (!isNaN(dateObj.getTime())) {
                            return this.isDateBeforeToday(dateObj);
                        }
                        if (dateObj === new Date()) {
                            startDates[index]?.cards.find(c => {
                                if (String(c.member) === id) {
                                    return c
                                }
                            })
                        }
                    }
                    return false;
                }).filter((card) => card.cardType === "study")
        }));
        return finel;
    }

    static async getCard(challengeId: string, cardId: string): Promise<Object | undefined> {
        let challenge = await this.challengeController.readOne(challengeId)
        let card = challenge?.cards.find(card => {
            return card._id = cardId
        })
        //class instead of this in the dto open files and build classes
        let filteredCard =
        {
            challengeName: challenge?.challengeName,
            title: card?.title,
            media: card?.media,
            id: card?._id
        }
        return filteredCard
    }

    private static calculateEndDate(startDate: Date | undefined, duration: number): string | null {
        if (!startDate || isNaN(startDate.getTime())) {
            console.error('Invalid startDate:', startDate);
            return null;
        }

        if (isNaN(duration)) {
            console.error('Invalid duration:', duration);
            return null;
        }

        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + duration);

        const formattedDay: string = ("0" + endDate.getDate()).slice(-2);
        const formattedMonth: string = ("0" + (endDate.getMonth() + 1)).slice(-2);
        const formattedYear: string = endDate.getFullYear().toString();

        return [formattedYear, formattedMonth, formattedDay].join("-");
    }

    private static isDateBeforeToday(date: Date | string): boolean {
        const today = new Date();
        const inputDate = typeof date === 'string' ? new Date(date) : date;

        return inputDate < today;
    }

}