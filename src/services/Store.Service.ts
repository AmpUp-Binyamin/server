import ChallengeController from "../controllers/ChallengeController";
import MemberController from "../controllers/MemberControllers";
import IChallenge from "../interfaces/IChallenge";
import IMember from "../interfaces/IMember";
import IStoreItem from "../interfaces/IStoreItem";
import MemberService from "../services/MemberService";

export default class StoreService {
  static controller = new ChallengeController();

  static async getChallenge(_id: string): Promise<IStoreItem[]> {
    const challenge = await this.controller.readOne(_id);
    console.log(" s ", challenge);

    if (!challenge) {
      throw new Error("this challenge dose not exist ");
    }
    return challenge.store.filter((i) => {
      if (i.daysToExpiry > 0 && i.quantity > 0) {
        return i;
      }
    });
  }
  static async updateMemberItems(
    memberId: string,
    challengeId: string,
    storeItemId: string
  ): Promise<IMember | IChallenge | null> {
    const memberController = new MemberController();
    const challengeController = new ChallengeController();
    // try{
    let member = await memberController.readOne(memberId);
    console.log("member befor:", member);
    let memberCoins = member?.coins;
console.log('memberCoins',memberCoins);

    let challenge = await challengeController.readOne(challengeId);
    console.log('1');
        let price = challenge?.store.find((c) => c._id == storeItemId)?.coins;
        console.log('2', price);
       let quantity = challenge?.store.find((c) => c._id == storeItemId)?.quantity;
console.log('3', quantity);

    if (memberCoins && price) {
      if (memberCoins > price) {
        //             // todo - update - myitems in member
       let newStoreItem= await MemberService.addNewStoreItem(memberId, storeItemId);
        // member = await memberController.readOne(memberId);
        console.log('newStoreItem',newStoreItem);
        
       let newCoineSum = await MemberService.updateMemberCoins(memberId, memberCoins - price);
        console.log('newCoineSum',newCoineSum);
        
       let newQuantity= await challengeController.updateQuantity(challengeId,storeItemId,quantity?quantity-1:0)
       console.log('newQuantity',newQuantity);
       
        let updatedChallenge = await challengeController.readOne(challengeId);
        console.log("challenge after:",updatedChallenge )
        // console.log("member after:", member);
        return updatedChallenge;
      }
    }return null
  }
}

//todo
//expiry day  -new data
