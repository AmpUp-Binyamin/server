import ChallengeController from "../controllers/ChallengeController";
import IStoreItem from "../interfaces/IStoreItem";

export default class StoreService {
  static controller = new ChallengeController();

  static async getChallenge(_id: string): Promise<IStoreItem[]> {
    const challenge = await this.controller.readOne(_id);
    console.log( " s ",  challenge);

    if (!challenge) {
      throw new Error("this challenge dose not exist ");
    }
    return challenge.store.filter((i)=>{
      if (i.daysToExpiry>0 && i.quantity > 0 ) {
        return i 
      }
    });
  }
}


//todo 
//expiry day  -new data