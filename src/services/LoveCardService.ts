import activeChallengeController from "../controllers/ActiveChallengeController";
import MemberController from "../controllers/MemberControllers";
import { RandomNumberGenerator } from "../helpers/luck";
import { ObjectId } from "mongoose";

export class loveCard {
  static controller = new activeChallengeController();
  static RandomGenerator = new RandomNumberGenerator();
  static memberController = new MemberController();

  static async getLove(challengeId: string): Promise<any> {
    // בודק באופן רנדומלי למי להביא פירגון

    let challenge = await this.controller.readOne(challengeId);
    console.log(challenge);
    
    if (!challenge) throw { code: 400, message: "go to hell!!!" };
    let num = challenge.participants.length;
    let random = this.RandomGenerator.getRandom(0, num - 1)
    console.log({random});
    console.log(challenge.participants);
    
    let userId = challenge.participants[random];
    console.log({userId});
    
    if (!userId) {
      throw { code: 400, message: "go to hell!!!" };
    }
    // מפה בדיקות למה להביא פירגון 1.אם יום ראשון
    // 2. אם התחלי X ימים ולא סיים
    //  3. לא עשה 3 ימים וחזר לעשות
    if (await this.CheckingFristDay(userId, challenge)) return { userId: { "frist Day": "good luck" } };
     this.DoNotFinish(userId, challenge);

    // return await  this.memberController.readOne((userId))
  }
  static async CheckingFristDay(userId: ObjectId, challenge: any) {
    for (let i = 0; i < challenge.cards.length; i++) {
      const card = challenge.cards[i];
      if (card.challengeDay !== 1) {
        return false;
      }
    }
    return true;
  }

  static async DoNotFinish(userId: ObjectId, challenge: any): Promise<any> {
let startDate = challenge.startDate
// console.log(challenge.cards);
const maxChallengeDay = Math.max(...challenge.cards.map((card: any) => card.challengeDay));
console.log("***********************************");
let x= 3
console.log(maxChallengeDay);
let total = 0
for (let i = maxChallengeDay; i > maxChallengeDay-x; i--){
let num =0
console.log("&&&&");


challenge.cards.forEach((card: any) =>{

  // console.log({card});
  // console.log({userId});
  
  if(card.member  === userId && card.challengeDay === i){
    console.log({card});

    num++
    console.log(num);
  }
  if (num < 6 && num > 0)  total++
})


}
if (total == 3 ) return {userId:"Send him not to despair, you can do it"}

    //   challenge.cards.filter(c => c.challenge)
    //כמה ימים היה  האתגר
    // בX  בדיקה אם נכנס וסיים בימים האחרונים
  }

  //       static async DoNotFinish(userId: any, ObjectId: any, challenge: any, any: any) {
  //       throw new Error("Function not implemented.")
  //   }
}
