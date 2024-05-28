import ChallengeController from "../controllers/ChallengeController";

export default class LuckService {

  static shapes: string[] = ["a", "b", "c", "d", "e", "f"];

  static getRandom(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  static getLottery(drawProbability: number): boolean {
    return drawProbability >= this.getRandom(1, 100);
  }

  static getWin(winProbability: number): any {
    const res = this.getRandom(1, 100);
    const rand5 = () => this.getRandom(0, 5);


    if (winProbability < res) {
      let resArr = [this.shapes[rand5()], this.shapes[rand5()]];

      let three = this.shapes[rand5()];
      while (resArr.every((c) => c == three)) {
        three = this.shapes[rand5()];
      }
      resArr.push(three);
      
      return {
        values: resArr,
        isWin: false,
      }; // TODO  Check what forms to return
    }

    return {
      values: [this.shapes[rand5()]],
      isWin: true,
      coin: 200,
      actionCards: ["acId"],
    };
  }
}

export class getLottery {
  static controller = new ChallengeController();

  static async luck(challengeId: string, cardId: string) {
    let challenge = await this.controller.readOne(challengeId);
    if (!challenge) throw { code: 400, message: "go to hell!!!" };
    let chance = challenge.cards.find((c) => c._id === cardId);
    if (!chance || chance.drawProbability === undefined) {
      throw { code: 400, message: "Card or drawProbability not found" };
    }
    const res = Math.floor(Math.random() * 100 + 1);

    return chance.drawProbability >= res;
  }
}

export class luck {
  static controller = new ChallengeController();

  static async luck(challengeId: string, cardId: string) {
    let challenge = await this.controller.readOne(challengeId);
    if (!challenge) throw { code: 400, message: "go to hell!!!" };
    let chance = challenge.cards.find((c) => c._id === cardId);
    if (!chance || chance.winProbability === undefined) {
      throw { code: 400, message: "Card or winProbability not found" };
    }
    const res = Math.random() * 100;
    const math = () => {
      return Math.floor(Math.random() * (5 - 0 + 1) + 0);
    };
    let arr = ["a", "b", "c", "d", "e", "f"];

    if (chance.winProbability < res) {
      let resArr = [arr[math()], arr[math()]];

      let three = arr[math()];
      while (resArr.every((c) => c == three)) {
        three = arr[math()];
      }
      resArr.push(three);
      return {
        values: resArr,
        isWin: false,
      }; // TODO  Check what forms to return
    }

    return {
      values: [arr[math()]],
      isWin: true,
      coin: 200,
      actionCards: ["acId"],
    };
  }
}

// להוציא אחוז מהסרבר שלי הקלף בחבילה של האחוז ניצחון
//
// function Winn(chance : number){

// }
