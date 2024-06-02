import ICard from "../../interfaces/ICard";
import ICoach from "../../interfaces/ICoach";

export default class GetStatusDoneCardsRes {
    cardsOfToday: ICard[]
    completedDays: number[]
    coach: Partial<ICoach>

    constructor(cardsOfToday: ICard[], completedDays: number[], coach: Partial<ICoach>) {
        this.cardsOfToday = cardsOfToday
        this.completedDays = completedDays
        this.coach = coach
    }
}