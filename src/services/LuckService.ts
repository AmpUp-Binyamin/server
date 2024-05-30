import ChallengeController from "../controllers/ChallengeController";
import LuckResponse from "../dto/luck/LuckResponse";
import { RandomNumberGenerator } from "../helpers/luck";
import { ObjectId } from "mongoose";
import IActiveChallenge, { IActiveCard } from "../interfaces/IActiveChallenge";
export class LuckHelper {
  static RandomGenerator = new RandomNumberGenerator()
  static shapes: string[] = ["a", "b", "c", "d", "e", "f"];
  static getLottery(drawProbability: number): boolean {
    return drawProbability >= this.RandomGenerator.getRandom(0, 1);
  }

  static getWin(winProbability: number): any {
    const res = this.RandomGenerator.getRandom(0, 1);
    const rand5 = () => this.RandomGenerator.getRandom(0, 5);
    let isWin = winProbability < res;
    let luckResponse = new LuckResponse(isWin);
    if (!isWin) {
      let resArr = [this.shapes[rand5()], this.shapes[rand5()]];

      let three = this.shapes[rand5()];
      while (resArr.every((c) => c == three)) {
        three = this.shapes[rand5()];
      }
      luckResponse.values = [three, ...resArr];
      return luckResponse;
    }

    luckResponse.values = [this.shapes[rand5()]];
    luckResponse.coin = 200;
    luckResponse.actionCards = [];
    return luckResponse;
  }
}

export default class LuckService {
  static controller = new ChallengeController();

  static async getCasino(
    challengeId: string,
    cardId: string
  ): Promise<boolean> {
    let challenge = await this.controller.readOne(challengeId);
    if (!challenge) throw { code: 400, message: "go to hell!!!" };
    let chance = challenge.cards.find((c) => String(c._id) === cardId);
    if (!chance || chance.drawProbability === undefined) {
      throw { code: 400, message: "Card or drawProbability not found" };
    }
    return LuckHelper.getLottery(chance.drawProbability);
  }

  static async getResCasino(challengeId: string, cardId: string): Promise<any> {
    let challenge = await this.controller.readOne(challengeId);
    if (!challenge) throw { code: 400, message: "go to hell!!!" };
    let chance = challenge.cards.find((c) => String(c._id) === cardId);

    if (!chance || chance.winProbability === undefined) {
      throw { code: 400, message: "Card or winProbability not found" };
    }
    return LuckHelper.getWin(chance.winProbability);
  }

  positiveStreakCheck(memberId: ObjectId, activeChallenge: IActiveChallenge) {
    const memberIdStr = typeof memberId === 'string' ? memberId : memberId.toString()
    console.log("Chosen Member Id", memberIdStr);
    //------------------------------------- the full list of all the member's cards in this particular challenge
    const memberAnsweredCards: IActiveCard[] = activeChallenge.cards.reduce((prev: IActiveCard[], current: IActiveCard) => {
      const currentMemberIdStr = current.member.toString()
      if (currentMemberIdStr === memberIdStr) {
        prev.push(current)
      }
      return prev
    }, [])
    // console.log({ memberAnsweredCards }); 

    //----------------------------an object including a key as the number of the day, and a value of how many answers on that day
    //----------------------------example: {1:4, 2:5, 3:6, 4:6, 5:6}, 6 is not here, meaning he did not answered at day number 6
    const answeredDays: { [key: number]: number } = {}
    memberAnsweredCards.forEach(card => {
      let day = card.challengeDay
      if (answeredDays[day]) {
        answeredDays[day]++
      } else {
        answeredDays[day] = 1
      }
    })
    console.log({ answeredDays });
    console.log(Object.keys(answeredDays));

    //------------------------------------list of the days answered, for example [day1, day2 , day4 , day7]
    let answeredDaysList = Object.keys(answeredDays)

    if (answeredDaysList.length < 5) {
      console.log("Member does not have a streak of 5 or more");
      return "Member does not have a streak of 5 or more"
    }
    // console.log(answeredDays);
    const mostRecentAnswerDay: number = Number(answeredDaysList.slice(-1)[0])

    let streakCounter = 1

    console.log(mostRecentAnswerDay);

    // SAVE HOW MANY HE DID IN EACH DAY AND THEN COMPARE IT TO THE NUMBERS IN THE CHALLENGE ITSELF
    for (let i = (mostRecentAnswerDay - 1); i > 0; i--) {
      if (i === Number(answeredDaysList[i - 1])) {
        console.log(answeredDaysList[i - 1]);
        streakCounter++
      } else {
        console.log("Member missed a day! not eligible");
        return "Member missed a day! not eligible"
      }
      if (streakCounter === 5) {
        console.log("Member is on a streak of 5 days!!");
        return "Member is on a streak of 5 days!!"
      }
    }
  }
}
