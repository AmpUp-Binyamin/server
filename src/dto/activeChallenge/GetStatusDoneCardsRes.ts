import ICard from "../../interfaces/ICard";
import ICoach from "../../interfaces/ICoach";

export default class GetStatusDoneCardsRes {
    cardsOfToday: ICard[]
    totalDays: number
    challengeName :string
    completedDays: number[]
    coach: Partial<ICoach>

    constructor(cardsOfToday: ICard[], totalDays: number, completedDays: number[], coach: Partial<ICoach>,    challengeName :string) {
        this.cardsOfToday = cardsOfToday
        this.totalDays = totalDays
        this.completedDays = completedDays
        this.coach = coach
        this.challengeName = challengeName
    }
}