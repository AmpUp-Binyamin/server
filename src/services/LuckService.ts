import ChallengeController from "../controllers/ChallengeController";
import LuckResponse from "../dto/luck/LuckResponse";

export class LuckHelper {
  static shapes: string[] = ["a", "b", "c", "d", "e", "f"];

  static getRandom(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  static getLottery(drawProbability: number): boolean {
    return drawProbability >= this.getRandom(0, 1);
  }

  static getWin(winProbability: number): any {
    const res = this.getRandom(0, 1);
    const rand5 = () => this.getRandom(0, 5);
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
}
