import ChallengeController from "../controllers/ChallengeController";
import MemberController from "../controllers/MemberControllers";
import IChallenge from "../interfaces/IChallenge";
import IMember from "../interfaces/IMember";
import IStoreItem from "../interfaces/IStoreItem";
import MemberService from '../services/MemberService'

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
  static async updateMemberItems(memberId:string,challengeId:string,storeItemId:string):Promise < IMember| IChallenge | null>{
    const memberController = new MemberController
    const challengeController = new ChallengeController
    // try{
        let member = await memberController.readOne(memberId)
        console.log('member befor:', member);
        let memberCoins = member?.coins
        
        let storeItem = await challengeController.readOne(challengeId)
        let price = storeItem?.store.find(c=>c._id==storeItemId)?.coins

if (memberCoins && price){
        if (memberCoins> price){
//             // todo - update - myitems in member
            await MemberService.addNewStoreItem(memberId,storeItemId)
            member = await memberController.readOne(memberId)
            console.log('member after:', member);
            
//             // update - coins in member account
//             await this.controller.update(memberId,{storeItemId})
//             // update quntiti in storeItem
//             await storeController.updateQuantity(storeItemId)
//         }
//     }catch{
//         console.error("can not buy it")
    
     }
    }
    return null
}
}


//todo 
//expiry day  -new data