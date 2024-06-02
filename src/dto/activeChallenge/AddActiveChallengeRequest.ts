import { ObjectId } from "mongodb";
import IActiveChallenge, { IActiveCard } from "../../interfaces/IActiveChallenge";

export default class AddActiveChallengeRequest implements IActiveChallenge {
    coach: ObjectId;
    challenge: ObjectId;
    invited: string[];
    participants: ObjectId[];
    startDate: Date;
    cards: AddActiveCardRequest[]

    constructor(
        coach: ObjectId,
        challenge: ObjectId,
        invited: string[],
        participants: ObjectId[],
        startDate: Date,
        cards: AddActiveCardRequest[]
    ) {
        this.coach = coach;
        this.challenge = challenge;
        this.invited = invited;
        this.participants = participants;
        this.startDate = startDate;
        this.cards = cards;
    }
}

class AddActiveCardRequest implements IActiveCard {
    member: ObjectId;
    card: ObjectId;
    challengeDay: number;
    coins: number;
    answerValue: string;
    answerMedia?: string[];

    constructor(
        member: ObjectId,
        card: ObjectId,
        challengeDay: number,
        coins: number,
        answerValue: string,
        answerMedia?: string[]
    ) {
        this.member = member;
        this.card = card;
        this.challengeDay = challengeDay;
        this.coins = coins;
        this.answerValue = answerValue;
        this.answerMedia = answerMedia;
    }
}

